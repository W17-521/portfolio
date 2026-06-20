import { useEffect, useRef } from 'react';

export default function Plasma({
  color = '#B497CF',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = false,
}) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      timeRef.current += 0.005 * speed * (direction === 'reverse' ? -1 : 1);
      const t = timeRef.current;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const nx = (x / w - 0.5) * 4 * scale;
          const ny = (y / h - 0.5) * 4 * scale;
          const v = Math.sin(nx * 2 + t) + Math.cos(ny * 2 + t * 0.7)
            + Math.sin((nx + ny) * 1.5 + t * 1.3) + Math.cos((nx - ny) * 1.8 + t * 0.8);
          const idx = (y * w + x) * 4;
          const alpha = Math.max(0, Math.min(1, (v + 3) / 6)) * opacity;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = alpha * 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
}
