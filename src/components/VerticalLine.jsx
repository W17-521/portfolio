import { useEffect, useRef, useState } from 'react';
import styles from './VerticalLine.module.css';

export default function VerticalLine() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const parent = ref.current.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(windowHeight, windowHeight - rect.top);
      const totalHeight = rect.height;
      const progress = totalHeight > 0 ? Math.min(1, (visibleTop + windowHeight) / totalHeight) : 0;
      setHeight(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.line} style={{ height: `${height}%` }} />
    </div>
  );
}
