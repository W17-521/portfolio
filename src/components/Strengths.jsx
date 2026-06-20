import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './react-bits/BorderGlow';
import styles from './Strengths.module.css';

gsap.registerPlugin(ScrollTrigger);

const STRENGTHS = [
  { icon: '🎨', title: '设计创意', tags: ['Adobe PS', 'Adobe AI', 'Adobe AE', 'Adobe PR'] },
  { icon: '💻', title: '前端开发', tags: ['React', 'Vite', 'HTML/CSS', 'JavaScript'] },
  { icon: '🤖', title: 'AI 驱动', tags: ['Claude Code', 'Codex', 'Midjourney', 'Stable Diffusion'] },
  { icon: '🎬', title: '动画制作', tags: ['3D Max', 'Maya', 'Animate', 'AE 动效'] },
  { icon: '🧩', title: '品牌 IP', tags: ['青糯 IP', '电商视觉', '品牌设计', 'IP 运营'] },
  { icon: '🏆', title: '荣誉奖项', tags: ['国家二级', 'MS Office', '奖学金', '好青年'] },
];

export default function Strengths() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
      tl.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(gridRef.current.children, { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.3');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="strengths" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.heading} ref={headingRef}>
          <span className={styles.eyebrow}>STRENGTHS</span>
          能力优势
          <div className={styles.headingDivider} />
        </div>
        <div className={styles.grid} ref={gridRef}>
          {STRENGTHS.map((s) => (
            <BorderGlow
              key={s.title}
              edgeSensitivity={25}
              glowColor="268 80 58"
              backgroundColor="#ffffff"
              borderRadius={20}
              glowRadius={25}
              glowIntensity={0.7}
              coneSpread={20}
              animated
              colors={['#c084fc', '#a78bfa', '#7c3aed']}
            >
              <div className={styles.card}>
                <span className={styles.icon}>{s.icon}</span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <div className={styles.tags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
