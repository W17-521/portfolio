import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextPressure from './react-bits/TextPressure';
import styles from './Hero.module.css';

export default function Hero() {
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const bgTextRef = useRef(null);
  const dividerRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        .fromTo(
          bgTextRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 }
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          actionsRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          '-=0.3'
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.video}
        src={import.meta.env.BASE_URL + 'hero-bg.mp4'}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
      />

      <div className={styles.overlay} />

      <div className={styles.bgText} ref={bgTextRef} aria-hidden="true">
        FRONTEND
      </div>

      <div className={styles.content} ref={contentRef}>
        <p className={styles.greeting}>Hello, I'm</p>

        <h1 className={styles.title}>
          吴应晴
          <span className={styles.titleEn}>WU YINGQING</span>
        </h1>

        <div className={styles.divider} ref={dividerRef} />

        <div className={styles.subtitleWrap}>
          <p className={styles.subtitleCn}>
            设计驱动的前端开发者
          </p>
          <div className={styles.textPressureWrap}>
            <TextPressure
              text="Design-Driven"
              fontFamily="Roboto Flex"
              fontUrl="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="rgba(255,255,255,0.55)"
              strokeColor="#a78bfa"
              minFontSize={28}
            />
          </div>
        </div>

        <div className={styles.actions} ref={actionsRef}>
          <a href="#projects" className={styles.btnPrimary}>查看作品</a>
          <a href="#contact" className={styles.btnSecondary}>联系我</a>
        </div>
      </div>
    </section>
  );
}
