import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VineGrowth.module.css';

gsap.registerPlugin(ScrollTrigger);

const GRAPE_GROUPS = [
  { y: 300, set: [{ dx: 0, dy: 0, r: 12 }, { dx: -16, dy: -8, r: 10 }, { dx: 14, dy: -6, r: 10 }, { dx: -8, dy: 10, r: 9 }, { dx: 10, dy: 12, r: 10 }] },
  { y: 650, set: [{ dx: 0, dy: 0, r: 13 }, { dx: -18, dy: -10, r: 11 }, { dx: 16, dy: -8, r: 11 }, { dx: -10, dy: 12, r: 10 }, { dx: 12, dy: 14, r: 10 }, { dx: -20, dy: 2, r: 9 }] },
  { y: 1000, set: [{ dx: 0, dy: 0, r: 11 }, { dx: -14, dy: -6, r: 9 }, { dx: 13, dy: -8, r: 9 }, { dx: -6, dy: 10, r: 8 }] },
  { y: 1400, set: [{ dx: 0, dy: 0, r: 14 }, { dx: -20, dy: -12, r: 12 }, { dx: 18, dy: -6, r: 11 }, { dx: -12, dy: 14, r: 11 }, { dx: 14, dy: 12, r: 11 }, { dx: -22, dy: 4, r: 10 }, { dx: 22, dy: 2, r: 9 }] },
  { y: 1900, set: [{ dx: 0, dy: 0, r: 12 }, { dx: -16, dy: -8, r: 10 }, { dx: 15, dy: -6, r: 10 }, { dx: -8, dy: 12, r: 9 }, { dx: 10, dy: 10, r: 10 }] },
  { y: 2400, set: [{ dx: 0, dy: 0, r: 13 }, { dx: -18, dy: -10, r: 11 }, { dx: 17, dy: -8, r: 11 }, { dx: -10, dy: 14, r: 10 }, { dx: 12, dy: 12, r: 10 }, { dx: -20, dy: 2, r: 9 }] },
  { y: 2900, set: [{ dx: 0, dy: 0, r: 11 }, { dx: -14, dy: -7, r: 9 }, { dx: 14, dy: -6, r: 9 }, { dx: -7, dy: 11, r: 8 }] },
  { y: 3400, set: [{ dx: 0, dy: 0, r: 14 }, { dx: -20, dy: -10, r: 12 }, { dx: 18, dy: -8, r: 11 }, { dx: -12, dy: 13, r: 11 }, { dx: 14, dy: 12, r: 11 }, { dx: -22, dy: 3, r: 10 }, { dx: 22, dy: 1, r: 9 }] },
  { y: 3800, set: [{ dx: 0, dy: 0, r: 12 }, { dx: -16, dy: -9, r: 10 }, { dx: 15, dy: -7, r: 10 }, { dx: -8, dy: 11, r: 9 }, { dx: 10, dy: 11, r: 10 }] },
];

export default function VineGrowth() {
  const vineRef = useRef(null);
  const branchRefs = useRef([]);
  const grapeRefs = useRef([]);

  useEffect(() => {
    const vine = vineRef.current;
    if (!vine) return;
    const total = vine.getTotalLength();
    vine.style.strokeDasharray = total;
    vine.style.strokeDashoffset = total;

    const ctx = gsap.context(() => {
      gsap.to(vine, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      branchRefs.current.forEach((b) => {
        if (!b) return;
        const bl = b.getTotalLength();
        b.style.strokeDasharray = bl;
        b.style.strokeDashoffset = bl;
        gsap.to(b, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: b.closest('svg') ? '#about' : null,
            start: 'top 75%',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });
      });

      grapeRefs.current.forEach((g) => {
        if (!g) return;
        gsap.fromTo(g,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: g,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.outer} aria-hidden="true">
      <svg viewBox="0 0 200 4000" preserveAspectRatio="xMinYMin meet" className={styles.svg}>
        <path
          ref={vineRef}
          d="M100 0 C70 180, 140 320, 100 500 C55 680, 150 820, 100 1000 C50 1180, 145 1350, 100 1550 C60 1720, 140 1900, 100 2100 C55 2300, 150 2500, 100 2700 C50 2900, 145 3150, 100 3400 C65 3600, 130 3800, 100 4000"
          fill="none" stroke="url(#vG)" strokeWidth="4" strokeLinecap="round"
        />
        {[
          'M100 320 C115 290, 150 270, 175 265',
          'M100 780 C85 750, 50 735, 25 730',
          'M100 1450 C120 1420, 155 1400, 180 1395',
          'M100 2050 C80 2020, 45 2005, 20 2000',
          'M100 2800 C115 2770, 150 2755, 175 2750',
          'M100 3600 C80 3570, 45 3555, 20 3550',
        ].map((d, i) => (
          <path key={i} ref={el => { branchRefs.current[i] = el; }} d={d}
            fill="none" stroke="url(#vG)" strokeWidth="2.5" strokeLinecap="round" />
        ))}
        {GRAPE_GROUPS.map((grp, gi) => (
          <g key={gi} ref={el => { grapeRefs.current[gi] = el; }}>
            {grp.set.map((s, ci) => (
              <circle key={ci} cx={100 + s.dx} cy={grp.y + s.dy} r={s.r}
                fill={`url(#gp${(gi + ci) % 3})`} opacity="0.88" />
            ))}
          </g>
        ))}
        <defs>
          <linearGradient id="vG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="gp0"><stop offset="0%" stopColor="#ddd6fe" /><stop offset="100%" stopColor="#8b5cf6" /></radialGradient>
          <radialGradient id="gp1"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#7c3aed" /></radialGradient>
          <radialGradient id="gp2"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#6d28d9" /></radialGradient>
        </defs>
      </svg>
    </div>
  );
}
