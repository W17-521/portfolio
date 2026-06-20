import { useEffect, useRef } from 'react';

export default function Ferrofluid({
  colors = ['#ffffff', '#ffffff', '#ffffff'],
  speed = 0.5,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.2,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 2,
  flowDirection = 'down',
  opacity = 1,
  mouseInteraction = false,
  mouseStrength = 1,
  mouseRadius = 0.35,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, active: false });

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

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / w;
      mouseRef.current.y = (e.clientY - rect.top) / h;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Pre-compute Perlin-like noise field
    const perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) perm[i] = perm[i + 256] = i;
    for (let i = 255; i > 0; i--) {
      const j = (i * 17 + 97) % 256;
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }

    const grad = (hash, x, y) => {
      const h = hash & 3;
      return (h === 0 ? x : h === 1 ? -x : h === 2 ? y : -y);
    };

    const noise = (x, y) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const aa = grad(perm[perm[X] + Y], xf, yf);
      const ba = grad(perm[perm[X + 1] + Y], xf - 1, yf);
      const ab = grad(perm[perm[X] + Y + 1], xf, yf - 1);
      const bb = grad(perm[perm[X + 1] + Y + 1], xf - 1, yf - 1);
      return aa + u * (ba - aa) + v * (ab - aa) + u * v * (aa - ba - ab + bb);
    };

    const t0 = Date.now();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (Date.now() - t0) / 1000 * speed;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        const ny = y / h;
        for (let x = 0; x < w; x++) {
          const nx = x / w;
          let vx = nx;
          let vy = flowDirection === 'down' ? ny : ny;

          // Turbulence from noise
          vx += noise(nx * 4 * scale, ny * 4 * scale + elapsed) * turbulence * 0.1;
          vy += noise(nx * 4 * scale + 100, ny * 4 * scale + elapsed) * turbulence * 0.1;

          // Rim distortion
          const distFromCenter = Math.sqrt((vx - 0.5) ** 2 + (vy - 0.5) ** 2) * 2;
          const rimFactor = Math.max(0, 1 - rimWidth) + Math.sin(distFromCenter * Math.PI * 0.5) * rimWidth;

          // Mouse interaction
          if (mouseInteraction && mouseRef.current.active) {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const dist = Math.sqrt((vx - mx) ** 2 + (vy - my) ** 2);
            const influence = Math.max(0, 1 - dist / mouseRadius);
            vx += (mx - vx) * influence * mouseStrength * 0.1;
            vy += (my - vy) * influence * mouseStrength * 0.1;
          }

          // Flow & shimmer
          const flow = Math.sin(vx * 6 + elapsed * 2) * Math.cos(vy * 6 - elapsed) * shimmer;
          const value = (flow + rimFactor * glow) * sharpness;
          const clamped = Math.max(0, Math.min(1, (value + 1) / 2));

          const idx = (y * w + x) * 4;
          // Interpolate between colors
          const colorIdx = clamped * (colors.length - 1);
          const c0 = colors[Math.floor(colorIdx)];
          const c1 = colors[Math.min(Math.ceil(colorIdx), colors.length - 1)];
          const frac = colorIdx - Math.floor(colorIdx);

          const r0 = parseInt(c0?.slice(1, 3) || 'ff', 16);
          const g0 = parseInt(c0?.slice(3, 5) || 'ff', 16);
          const b0 = parseInt(c0?.slice(5, 7) || 'ff', 16);
          const r1 = parseInt(c1?.slice(1, 3) || 'ff', 16);
          const g1 = parseInt(c1?.slice(3, 5) || 'ff', 16);
          const b1 = parseInt(c1?.slice(5, 7) || 'ff', 16);

          data[idx] = r0 + (r1 - r0) * frac;
          data[idx + 1] = g0 + (g1 - g0) * frac;
          data[idx + 2] = b0 + (b1 - b0) * frac;
          data[idx + 3] = clamped * 255 * opacity;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [colors, speed, scale, turbulence, fluidity, rimWidth, sharpness, shimmer, glow, flowDirection, opacity, mouseInteraction, mouseStrength, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
}
