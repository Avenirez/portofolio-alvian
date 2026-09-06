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
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position for interactive gravity/repulsion
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Pause animation when background is not visible (performance saver)
    const observerVisibility = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        render();
      }
    });
    observerVisibility.observe(canvas);

    // 1. Cosmic Space Starfield System (Twinkling & Interactive Repulsion Stars)
    const starCount = Math.min(Math.floor((width * height) / 11000), 85);
    const stars = Array.from({ length: starCount }, () => {
      const baseX = Math.random() * width;
      const baseY = Math.random() * height;
      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 1.9 + 0.6,
        alpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        speedY: Math.random() * 0.25 + 0.05,
        speedX: (Math.random() - 0.5) * 0.15
      };
    });

    // 2. Rotating Cosmic Orbital Satellite Rings
    let orbitAngle1 = 0;
    let orbitAngle2 = Math.PI;

    // 3. Pulsing GIS Radar Rings
    let radarPulseRadius = 0;

    // 4. Floating tech & space symbols
    const techSymbols = ['{ }', '</>', '01', 'JS', 'React', 'Vite', 'GIS', 'API', 'SQL', 'CSS', '🪐', '✦'];
    const floatingNodes = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: techSymbols[Math.floor(Math.random() * techSymbols.length)],
      speedY: Math.random() * 0.25 + 0.1,
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.25 + 0.1,
      size: Math.floor(Math.random() * 6) + 12
    }));

    // 5. Space Shooting Meteors
    const meteors = Array.from({ length: 3 }, () => ({
      x: Math.random() * width * 1.5,
      y: Math.random() * height * 0.4 - 200,
      length: Math.random() * 100 + 60,
      speed: Math.random() * 4 + 2.5,
      opacity: Math.random() * 0.7 + 0.3,
      size: Math.random() * 1.5 + 0.8
    }));

    // Dynamic theme accent color parser
    const parseHexToRgb = (hexStr) => {
      if (!hexStr) return { r: 245, g: 158, b: 11 };
      let clean = hexStr.replace('#', '').trim();
      if (clean.length === 3) {
        clean = clean.split('').map((c) => c + c).join('');
      }
      const num = parseInt(clean, 16);
      if (isNaN(num)) return { r: 245, g: 158, b: 11 };
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    };

    const getThemeRgbColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const primaryHex = styles.getPropertyValue('--accent-primary').trim() || '#f59e0b';
      const secondaryHex = styles.getPropertyValue('--accent-secondary').trim() || '#ec4899';
      return {
        primary: parseHexToRgb(primaryHex),
        secondary: parseHexToRgb(secondaryHex)
      };
    };

    let themeColors = getThemeRgbColors();

    const observerTheme = new MutationObserver(() => {
      themeColors = getThemeRgbColors();
    });
    observerTheme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode']
    });

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      const { primary, secondary } = themeColors;
      const primaryRgbStr = `${primary.r}, ${primary.g}, ${primary.b}`;
      const secondaryRgbStr = `${secondary.r}, ${secondary.g}, ${secondary.b}`;

      // A. Render Pulsing GIS Satellite Radar Wave
      radarPulseRadius += 0.8;
      const maxRadarR = 260;
      if (radarPulseRadius > maxRadarR) radarPulseRadius = 0;

      const radarCenterX = width * 0.15;
      const radarCenterY = height * 0.35;
      const radarOpacity = (1 - radarPulseRadius / maxRadarR) * 0.18;

      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, radarPulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${primaryRgbStr}, ${radarOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // B. Render Rotating Cyber Orbital Satellite Rings
      const orbitCenterX = width * 0.85;
      const orbitCenterY = height * 0.28;
      const orbitR1 = 140;
      const orbitR2 = 210;

      orbitAngle1 += 0.006;
      orbitAngle2 -= 0.004;

      // Outer dashed orbital ring
      ctx.beginPath();
      ctx.setLineDash([6, 12]);
      ctx.arc(orbitCenterX, orbitCenterY, orbitR1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${primaryRgbStr}, 0.09)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      ctx.beginPath();
      ctx.setLineDash([4, 18]);
      ctx.arc(orbitCenterX, orbitCenterY, orbitR2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${secondaryRgbStr}, 0.07)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting Satellite Nodes
      const sat1X = orbitCenterX + Math.cos(orbitAngle1) * orbitR1;
      const sat1Y = orbitCenterY + Math.sin(orbitAngle1) * orbitR1;
      ctx.beginPath();
      ctx.arc(sat1X, sat1Y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primaryRgbStr}, 0.8)`;
      ctx.fill();

      const sat2X = orbitCenterX + Math.cos(orbitAngle2) * orbitR2;
      const sat2Y = orbitCenterY + Math.sin(orbitAngle2) * orbitR2;
      ctx.beginPath();
      ctx.arc(sat2X, sat2Y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${secondaryRgbStr}, 0.8)`;
      ctx.fill();

      // C. Render Cosmic Constellation Lines
      const maxDist = 125;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineOpacity = (1 - dist / maxDist) * 0.14 * stars[i].alpha;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(${primaryRgbStr}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // D. Render Twinkling Stars with Interactive Mouse Repulsion Physics
      stars.forEach((s) => {
        s.y -= s.speedY;
        s.x += s.speedX;

        // Interactive Mouse Magnetic Repulsion
        if (mouse.active) {
          const mdx = s.x - mouse.x;
          const mdy = s.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const repelRadius = 140;

          if (mdist < repelRadius) {
            const force = (repelRadius - mdist) / repelRadius;
            const angle = Math.atan2(mdy, mdx);
            s.x += Math.cos(angle) * force * 3.5;
            s.y += Math.sin(angle) * force * 3.5;
          }
        }

        // Twinkle pulse effect
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 0.85) {
          s.alpha = 0.85;
          s.twinkleDir = -1;
        } else if (s.alpha <= 0.15) {
          s.alpha = 0.15;
          s.twinkleDir = 1;
        }

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();
      });

      // E. Render Floating Tech & Space Code Symbols
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

        ctx.fillStyle = `rgba(${primaryRgbStr}, ${node.opacity})`;
        ctx.fillText(node.symbol, node.x, node.y);
      });

      // F. Render Space Meteors (Shooting Stars)
      meteors.forEach((m) => {
        m.x -= m.speed * 1.5;
        m.y += m.speed;

        if (m.y > height + 100 || m.x < -100) {
          m.x = Math.random() * width * 1.5;
          m.y = Math.random() * height * 0.3 - 200;
          m.speed = Math.random() * 4 + 2.5;
        }

        const gradient = ctx.createLinearGradient(m.x, m.y, m.x + m.length, m.y - m.length);
        gradient.addColorStop(0, `rgba(${primaryRgbStr}, ${m.opacity})`);
        gradient.addColorStop(0.5, `rgba(${secondaryRgbStr}, ${m.opacity * 0.5})`);
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
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observerTheme.disconnect();
      observerVisibility.disconnect();
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
