import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './react-bits/BorderGlow';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 5, suffix: '+', label: '完成项目' },
  { value: 3, suffix: '%', label: '专业排名' },
  { value: 12, suffix: '+', label: '掌握技能' },
  { value: 4, suffix: 'x', label: 'AI工具链' },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsGridRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
      tl.fromTo(imageRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
        .fromTo(textRef.current.children, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
        .fromTo(statsGridRef.current.children, { opacity: 0, y: 24, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
        .fromTo(contactRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.imageCol} ref={imageRef}>
          <div className={styles.imageWrapper}>
            <div className={styles.glowOrb} />
            <img src="/avatar.png" alt="吴应晴头像" className={styles.image} />
          </div>
        </div>

        <div className={styles.textCol} ref={textRef}>
          <h2 className={styles.heading}>
            <span className={styles.eyebrow}>ABOUT</span>
            吴应晴
          </h2>
          <div className={styles.headingDivider} />
          <p className={styles.bio}>
            拥有从设计策略到前端落地的全链路实现能力。以 Adobe
            系列为核心进行视觉创意与 UI 设计，深耕电商视觉、品牌 IP
            与 Web 交互领域。善于运用 AI 工具驱动创意爆发，并借助 AI
            编程助手高效完成网页制作，将设计精准转化为代码。
          </p>

          <div className={styles.statsGrid} ref={statsGridRef}>
            {STATS.map((s) => (
              <BorderGlow
                key={s.label}
                edgeSensitivity={30}
                glowColor="268 80 58"
                backgroundColor="#ffffff"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={0.8}
                coneSpread={25}
                animated
                colors={['#c084fc', '#a78bfa', '#7c3aed']}
              >
                <div className={styles.statCardInner}>
                  <span className={styles.statNumber}>{s.value}{s.suffix}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </BorderGlow>
            ))}
          </div>

          <div className={styles.contactRow} ref={contactRef}>
            <span className={styles.contactItem}>✉ 2191017783@qq.com</span>
            <span className={styles.contactItem}>✆ 18991557566</span>
          </div>
        </div>
      </div>
    </section>
  );
}
