import { createContext, useContext, useState, forwardRef } from 'react';
import styles from './CardHoverReveal.module.css';

const ctx = createContext({ isHovered: false });

const useHover = () => {
  const c = useContext(ctx);
  if (!c) throw new Error('CardHoverReveal.* must be inside <CardHoverReveal>');
  return c;
};

const CardHoverReveal = forwardRef(({ className = '', children, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <ctx.Provider value={{ isHovered }}>
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </div>
    </ctx.Provider>
  );
});
CardHoverReveal.displayName = 'CardHoverReveal';

const CardHoverRevealMain = forwardRef(({ className = '', initialScale = 1, hoverScale = 1.05, children, style, ...props }, ref) => {
  const { isHovered } = useHover();
  return (
    <div
      ref={ref}
      className={`${styles.main} ${className}`}
      style={{
        transform: `scale(${isHovered ? hoverScale : initialScale})`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
CardHoverRevealMain.displayName = 'CardHoverRevealMain';

const CardHoverRevealContent = forwardRef(({ className = '', children, style, ...props }, ref) => {
  const { isHovered } = useHover();
  return (
    <div
      ref={ref}
      className={`${styles.content} ${className}`}
      style={{
        transform: isHovered ? 'translateY(0)' : 'translateY(120%)',
        opacity: isHovered ? 1 : 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
CardHoverRevealContent.displayName = 'CardHoverRevealContent';

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent };
