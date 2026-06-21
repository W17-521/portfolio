import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VineGrowth.module.css';

gsap.registerPlugin(ScrollTrigger);

const GRAPES = [
  { y: 250, clusters: [{ x: 0, r: 12 }, { x: -16, y: -8, r: 10 }, { x: 14, y: -6, r: 10 }, { x: -8, y: 10, r: 9 }, { x: 10, y: 12, r: 10 }] },
  { y: 550, clusters: [{ x: 0, r: 13 }, { x: -18, y: -10, r: 11 }, { x: 16, y: -8, r: 11 }, { x: -10, y: 12, r: 10 }, { x: 12, y: 14, r: 10 }, { x: -20, y: 2, r: 9 }] },
  { y: 900, clusters: [{ x: 0, r: 11 }, { x: -14, y: -6, r: 9 }, { x: 13, y: -8, r: 9 }, { x: -6, y: 10, r: 8 }] },
  { y: 1250, clusters: [{ x: 0, r: 14 }, { x: -20, y: -12, r: 12 }, { x: 18, y: -6, r: 11 }, { x: -12, y: 14, r: 11 }, { x: 14, y: 12, r: 11 }, { x: -22, y: 4, r: 10 }, { x: 22, y: 2, r: 9 }] },
  { y: 1700, clusters: [{ x: 0, r: 12 }, { x: -16, y: -8, r: 10 }, { x: 15, y: -6, r: 10 }, { x: -8, y: 12, r: 9 }, { x: 10, y: 10, r: 10 }] },
  { y: 2150, clusters: [{ x: 0, r: 13 }, { x: -18, y: -10, r: 11 }, { x: 17, y: -8, r: 11 }, { x: -10, y: 14, r: 10 }, { x: 12, y: 12, r: 10 }, { x: -20, y: 2, r: 9 }] },
  { y: 2650, clusters: [{ x: 0, r: 11 }, { x: -14, y: -7, r: 9 }, { x: 14, y: -6, r: 9 }, { x: -7, y: 11, r: 8 }] },
  { y: 3200, clusters: [{ x: 0, r: 14 }, { x: -20, y: -10, r: 12 }, { x: 18, y: -8, r: 11 }, { x: -12, y: 13, r: 11 }, { x: 14, y: 12, r: 11 }, { x: -22, y: 3, r: 10 }, { x: 22, y: 1, r: 9 }] },
  { y: 3700, clusters: [{ x: 0, r: 12 }, { x: -16, y: -9, r: 10 }, { x: 15, y: -7, r: 10 }, { x: -8, y: 11, r: 9 }, { x: 10, y: 11, r: 10 }] },
];

export default function VineGrowth() {
  const vineRef = useRef(null);
  const branchesRef = useRef([]);
  const grapesRef = useRef([]);

  useEffect(() => {
    const vine = vineRef.current;
    if (!vine) return;

    const length = vine.getTotalLength();
    vine.style.strokeDasharray = length;
    vine.style.strokeDashoffset = length;

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

      branchesRef.current.forEach((b, i) => {
        if (!b) return;
        const bl = b.getTotalLength();
        b.style.strokeDasharray = bl;
        b.style.strokeDashoffset = bl;
        gsap.to(b, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#about',
            start: `top ${85 - i * 3}%`,
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });
      });

      grapesRef.current.forEach((g) => {
        if (!g) return;
        gsap.fromTo(
          g,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
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
      <svg
        viewBox="0 0 200 4000"
        preserveAspectRatio="xMinYMin meet"
        className={styles.svg}
      >
        {/* Main vine — thick, winding */}
        <path
          ref={vineRef}
          d="M100 0
             C70 180, 140 320, 100 500
             C55 680, 150 820, 100 1000
             C50 1180, 145 1350, 100 1550
             C60 1720, 140 1900, 100 2100
             C55 2300, 150 2500, 100 2700
             C50 2900, 145 3150, 100 3400
             C65 3600, 130 3800, 100 4000"
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Branch vines */}
        {[
          'M100 300 C110 270, 145 250, 170 245',
          'M100 700 C85 675, 55 660, 30 655',
          'M100 1300 C115 1270, 150 1250, 175 1245',
          'M100 1850 C85 1825, 55 1810, 30 1805',
          'M100 2500 C110 2475, 145 2460, 170 2455',
          'M100 3400 C85 3375, 55 3360, 30 3355',
        ].map((d, i) => (
          <path
            key={i}
            ref={el => { branchesRef.current[i] = el; }}
            d={d}
            fill="none"
            stroke="url(#vineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}

        {/* Grape clusters */}
        {GRAPES.map((group, gi) => (
          <g
            key={gi}
            ref={el => { grapesRef.current[gi] = el; }}
          >
            {group.clusters.map((c, ci) => (
              <circle
                key={ci}
                cx={100 + c.x}
                cy={group.y + (c.y || 0)}
                r={c.r}
                fill={`url(#grape${(gi + ci) % 3})`}
                opacity="0.88"
              />
            ))}
          </g>
        ))}

        <defs>
          <linearGradient id="vineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="grape0"><stop offset="0%" stopColor="#ddd6fe" /><stop offset="100%" stopColor="#8b5cf6" /></radialGradient>
          <radialGradient id="grape1"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#7c3aed" /></radialGradient>
          <radialGradient id="grape2"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#6d28d9" /></radialGradient>
        </defs>
      </svg>
    </div>
  );
}
