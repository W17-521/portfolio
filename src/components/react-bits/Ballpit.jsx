import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Ballpit({
  count = 100,
  gravity = 0.5,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = false,
  colors = ['#ddaeff', '#ffffff', '#b748ff'],
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(0.25, 32, 32);
    const balls = [];
    const bounds = { x: 5, y: 5 * (height / width) };

    colors.forEach((color, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.3,
        metalness: 0.1,
      });
      const countPerColor = Math.floor(count / colors.length);
      for (let j = 0; j < countPerColor; j++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * bounds.x * 2,
          (Math.random() - 0.5) * bounds.y * 2,
          (Math.random() - 0.5) * 3
        );
        balls.push({
          mesh,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          vz: 0,
        });
        scene.add(mesh);
      }
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 10);
    scene.add(dirLight);

    const handleMouse = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / width - 0.5) * bounds.x * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / height - 0.5) * bounds.y * 2;
    };

    if (followCursor) {
      container.addEventListener('mousemove', handleMouse);
    }

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      balls.forEach(ball => {
        if (followCursor) {
          const dx = mouseRef.current.x - ball.mesh.position.x;
          const dy = mouseRef.current.y - ball.mesh.position.y;
          ball.vx += dx * 0.0002;
          ball.vy += dy * 0.0002;
        }
        ball.vy -= gravity * 0.001;
        ball.vx *= friction;
        ball.vy *= friction;
        ball.mesh.position.x += ball.vx;
        ball.mesh.position.y += ball.vy;
        if (Math.abs(ball.mesh.position.x) > bounds.x) {
          ball.mesh.position.x = Math.sign(ball.mesh.position.x) * bounds.x;
          ball.vx *= -wallBounce;
        }
        if (Math.abs(ball.mesh.position.y) > bounds.y) {
          ball.mesh.position.y = Math.sign(ball.mesh.position.y) * bounds.y;
          ball.vy *= -wallBounce;
        }
        ball.mesh.rotation.x += ball.vx * 2;
        ball.mesh.rotation.y += ball.vy * 2;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (followCursor) container.removeEventListener('mousemove', handleMouse);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      balls.forEach(b => b.mesh.material.dispose());
    };
  }, [count, gravity, friction, wallBounce, followCursor, colors]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
