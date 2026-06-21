import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VineGrowth.module.css';

gsap.registerPlugin(ScrollTrigger);

const GRAPE_CLUSTERS = [
  { cy: 350, r: 6, count: 3 },
  { cy: 700, r: 7, count: 4 },
  { cy: 1100, r: 5, count: 3 },
  { cy: 1550, r: 7, count: 5 },
  { cy: 2000, r: 6, count: 3 },
  { cy: 2500, r: 7, count: 4 },
  { cy: 3000, r: 5, count: 3 },
  { cy: 3400, r: 6, count: 4 },
];

export default function VineGrowth() {
  const vineRef = useRef(null);
  const grapesRef = useRef([]);

  useEffect(() => {
    const vine = vineRef.current;
    if (!vine) return;

    const pathLength = vine.getTotalLength();
    vine.style.strokeDasharray = pathLength;
    vine.style.strokeDashoffset = pathLength;

    const ctx = gsap.context(() => {
      gsap.to(vine, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      grapesRef.current.forEach((g, i) => {
        if (!g) return;
        gsap.fromTo(
          g,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: g,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        viewBox="0 0 160 3800"
        preserveAspectRatio="xMinYMin meet"
        className={styles.svg}
      >
        {/* Main vine */}
        <path
          ref={vineRef}
          d="M80 0
             C60 200, 120 350, 80 500
             C40 650, 100 750, 80 900
             C55 1050, 110 1200, 80 1400
             C50 1600, 115 1750, 80 1950
             C45 2150, 105 2350, 80 2600
             C55 2800, 110 3050, 80 3300
             C60 3500, 95 3650, 80 3800"
          fill="none"
          stroke="url(#vineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Small branching vines */}
        <path
          d="M80 400 C90 380, 120 370, 135 365"
          fill="none" stroke="url(#vineGradient)" strokeWidth="1.2" strokeLinecap="round"
        />
        <path
          d="M80 900 C65 880, 40 870, 20 865"
          fill="none" stroke="url(#vineGradient)" strokeWidth="1" strokeLinecap="round"
        />
        <path
          d="M80 1550 C95 1530, 125 1515, 140 1510"
          fill="none" stroke="url(#vineGradient)" strokeWidth="1.3" strokeLinecap="round"
        />
        <path
          d="M80 2500 C60 2480, 35 2470, 20 2465"
          fill="none" stroke="url(#vineGradient)" strokeWidth="1" strokeLinecap="round"
        />

        {/* Grapes clusters */}
        {GRAPE_CLUSTERS.map((cluster, i) => (
          <g
            key={i}
            ref={el => { grapesRef.current[i] = el; }}
          >
            {Array.from({ length: cluster.count }).map((_, j) => {
              const angle = (j / cluster.count) * Math.PI * 2;
              const spread = cluster.r * 1.8;
              const cx = cluster.cx || 80 + j * 12 - (cluster.count * 6);
              // Alternate left/right for clusters
              const isLeft = i % 2 === 0;
              const baseX = isLeft ? 80 - cluster.r * 2 : 80 + cluster.r * 2;
              const offsetX = Math.cos(angle) * spread;
              const offsetY = Math.sin(angle) * spread;
              const r = cluster.r * (0.7 + Math.random() * 0.4);
              return (
                <circle
                  key={j}
                  cx={baseX + offsetX * 0.6}
                  cy={cluster.cy + offsetY * 0.6}
                  r={r}
                  fill={`url(#grapeGrad${(i + j) % 3})`}
                  opacity={0.85}
                />
              );
            })}
          </g>
        ))}

        {/* Tiny leaves */}
        {[300, 800, 1400, 2100, 2700, 3300].map((y, i) => {
          const isRight = i % 2 === 0;
          const x = isRight ? 90 : 70;
          const cx = isRight ? x + 8 : x - 8;
          return (
            <ellipse
              key={i}
              cx={cx} cy={y - 5}
              rx="6" ry="3"
              fill="rgba(167, 139, 250, 0.4)"
              transform={`rotate(${isRight ? 20 : -20} ${cx} ${y - 5})`}
            />
          );
        })}

        <defs>
          <linearGradient id="vineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="grapeGrad0">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <radialGradient id="grapeGrad1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </radialGradient>
          <radialGradient id="grapeGrad2">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
