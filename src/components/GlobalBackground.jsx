import React, { useEffect, useRef } from 'react';

/**
 * GlobalBackground - Multi-layered GPU accelerated background system
 * Layer 1: Dot Matrix Grid Pattern
 * Layer 2: Theme-Reactive Section Gradient Glowing Orbs
 * Layer 3: Interactive Floating Particle Canvas
 * Layer 4: Subtle Film Grain Overlay
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

    // Create 45 ambient floating particle stars
    const particleCount = Math.min(Math.floor(width / 30), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update position
        p.y -= p.speedY;
        p.x += p.speedX;

        // Pulse opacity
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.003;
        const currentOpacity = Math.max(0.1, Math.min(0.75, p.opacity));

        // Wrap around screen edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing particle star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'var(--accent-primary)';
        ctx.fill();
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
          opacity: 0.45
        }}
      />

      {/* Layer 2: Theme-Reactive Section Gradient Orbs */}
      {/* Section 1: Behind Projects Showcase */}
      <div
        style={{
          position: 'absolute',
          top: '30vh',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.45
        }}
      />

      {/* Section 2: Behind Tech Stack */}
      <div
        style={{
          position: 'absolute',
          top: '110vh',
          left: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 75%)',
          filter: 'blur(100px)',
          opacity: 0.4
        }}
      />

      {/* Section 3: Behind Contact Form */}
      <div
        style={{
          position: 'absolute',
          top: '190vh',
          right: '15%',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(85px)',
          opacity: 0.45
        }}
      />

      {/* Layer 3: Interactive Floating Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />

      {/* Layer 4: Subtle Film Grain Noise Texture Overlay */}
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
