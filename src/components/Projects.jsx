import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent } from './react-bits/CardHoverReveal';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: '塔罗牌游戏',
    desc: '交互式塔罗牌占卜体验，流畅的卡牌动画与神秘氛围设计',
    url: 'https://tarot-game-1r2.pages.dev',
    image: import.meta.env.BASE_URL + 'tarot-preview.png',
    tags: ['React', '游戏交互', '动画'],
  },
  {
    title: '健康监测应用',
    desc: '个人健康数据追踪看板，清晰的数据可视化与状态管理',
    url: 'https://w17-521.github.io/health-monitor-app/?v=2',
    image: import.meta.env.BASE_URL + 'health-preview.png',
    tags: ['Vue', '数据可视化', '健康'],
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        headingRef.current.querySelector('div'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
        '-=0.3'
      );

      cardsRef.current.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          i === 0 ? '-=0.5' : '-=0.3'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.heading} ref={headingRef}>
          <span className={styles.eyebrow}>PROJECTS</span>
          精选项目
          <div className={styles.headingDivider} />
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.url}
              ref={el => { cardsRef.current[i] = el; }}
            >
              <CardHoverReveal
                className={styles.cardHover}
                onClick={() => handleCardClick(p.url)}
              >
                <CardHoverRevealMain>
                  <img src={p.image} alt={p.title} />
                </CardHoverRevealMain>

                <CardHoverRevealContent className={styles.cardPanel}>
                  <span className={styles.cardIndex}>0{i + 1}</span>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.cardTags}>
                    {p.tags.map(t => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.cardLink}>
                    预览项目 ↗
                  </span>
                </CardHoverRevealContent>
              </CardHoverReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
