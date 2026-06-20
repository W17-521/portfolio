import { useRef, useState } from 'react';

export default function Dock({
  items = [],
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
  className = '',
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const dockRef = useRef(null);
  const maxAdditionalSize = magnification - baseItemSize;

  const handleMouseMove = (e, index) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const getItemSize = (index) => {
    if (hoverIndex === null) return baseItemSize;
    const distance = Math.abs(index - hoverIndex);
    if (distance === 0) return baseItemSize + maxAdditionalSize;
    if (distance === 1) return baseItemSize + maxAdditionalSize * 0.5;
    if (distance === 2) return baseItemSize + maxAdditionalSize * 0.2;
    return baseItemSize;
  };

  return (
    <div
      ref={dockRef}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '4px',
        height: panelHeight + maxAdditionalSize + 16,
        padding: '8px 16px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
      }}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => {
        const size = getItemSize(index);
        return (
          <div
            key={index}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={item.onClick}
            style={{
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              background: hoverIndex === index
                ? 'rgba(124, 58, 237, 0.25)'
                : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
              fontSize: '14px',
            }}
            title={item.label}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}
