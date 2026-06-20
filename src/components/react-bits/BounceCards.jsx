import { motion } from 'motion/react';

export default function BounceCards({
  images = [],
  containerWidth = 500,
  containerHeight = 250,
  animationDelay = 1,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.5)',
  transformStyles = [],
  enableHover = false,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        margin: '0 auto',
      }}
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: animationDelay + i * animationStagger,
            type: 'spring',
            stiffness: 120,
            damping: 14,
          }}
          whileHover={enableHover ? { scale: 1.08, zIndex: 10 } : {}}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            transform: transformStyles[i] || 'none',
            transformOrigin: 'center center',
            boxShadow: '0 4px 30px rgba(0,0,0,0.15)',
            border: '1px solid rgba(167, 139, 250, 0.25)',
            zIndex: images.length - i,
            background: '#fff',
          }}
        >
          <img
            src={img}
            alt={`card-${i}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
