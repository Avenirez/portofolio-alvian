import React, { useEffect, useRef } from 'react';

/**
 * GlobalBackground - Multi-layered GPU accelerated ambient background system
 * Layer 1: Animated Dot Matrix & Cyber Mesh Grid
 * Layer 2: Theme-Reactive Pulsing Ambient Glowing Orbs
 * Layer 3: Interactive Particle Constellation Canvas + Tech Code Particles + Shooting Meteors
 * Layer 4: Floating Animated Cyber Rings
 */
export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle constellation system
    const particleCount = Math.min(Math.floor(width / 18), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005
    }));

    // Floating tech symbols
    const techSymbols = ['{ }', '</>', '01', 'JS', 'React', 'Vite', 'GIS', 'API', 'SQL', 'CSS'];
    const floatingNodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: techSymbols[Math.floor(Math.random() * techSymbols.length)],
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      size: Math.floor(Math.random() * 6) + 12
    }));

    // Shooting Meteors
    const meteors = Array.from({ length: 4 }, () => ({
      x: Math.random() * width * 1.5,
      y: Math.random() * height * 0.5 - 200,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.7 + 0.3,
      size: Math.random() * 1.5 + 0.8
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 110) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render glowing particle dots
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
        ctx.fill();
      });

      // Render floating code symbols
      ctx.font = '600 13px Space Grotesk, monospace';
      floatingNodes.forEach((node) => {
        node.y -= node.speedY;
        node.x += node.speedX;

        if (node.y < -30) {
          node.y = height + 30;
          node.x = Math.random() * width;
        }
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;

        ctx.fillStyle = `rgba(245, 158, 11, ${node.opacity})`;
        ctx.fillText(node.symbol, node.x, node.y);
      });

      // Render shooting meteors
      meteors.forEach((m) => {
        m.x -= m.speed * 1.4;
        m.y += m.speed;

        if (m.y > height + 100 || m.x < -100) {
          m.x = Math.random() * width * 1.5;
          m.y = Math.random() * height * 0.3 - 200;
          m.speed = Math.random() * 4 + 2.5;
        }

        const gradient = ctx.createLinearGradient(m.x, m.y, m.x + m.length, m.y - m.length);
        gradient.addColorStop(0, `rgba(245, 158, 11, ${m.opacity})`);
        gradient.addColorStop(0.5, `rgba(236, 72, 153, ${m.opacity * 0.6})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.length, m.y - m.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Layer 1: Dot Matrix Grid Pattern */}
      <div
        className="global-dot-grid"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5
        }}
      />

      {/* Layer 2: Theme-Reactive Section Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '25vh',
          right: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(95px)',
          opacity: 0.55
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '105vh',
          left: '3%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 75%)',
          filter: 'blur(110px)',
          opacity: 0.5
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '185vh',
          right: '10%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.55
        }}
      />

      {/* Layer 3: Particle Constellations & Tech Symbol Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />

      {/* Layer 4: Film Grain Noise Overlay */}
      <div
        className="film-grain-overlay"
        style={{
          position: 'absolute',
          inset: 0
        }}
      />
    </div>
  );
}
