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

    // Track mouse position and scroll velocity for interactive tethering & warp trails
    const mouse = { x: -1000, y: -1000, active: false };
    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;

    // Click effects array for GIS Radar Waypoint Pings & Cosmic Spark Bursts
    const clickEffects = [];

    let lastTrailTime = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const now = performance.now();
      if (now - lastTrailTime > 25) {
        lastTrailTime = now;

        // Leave 2 glowing white stardust dots (bintik-bintik putih) behind cursor movement
        for (let i = 0; i < 2; i++) {
          const offsetX = (Math.random() - 0.5) * 16;
          const offsetY = (Math.random() - 0.5) * 16;
          clickEffects.push({
            type: 'driftingWhiteDot',
            x: e.clientX + offsetX,
            y: e.clientY + offsetY,
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4 - 0.5, // gentle float
            size: Math.random() * 2.8 + 0.8,
            color: Math.random() > 0.2 ? '#ffffff' : '#f8fafc',
            alpha: 0.95,
            decay: Math.random() * 0.022 + 0.014,
            isStarSymbol: Math.random() > 0.6
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const spawnWhiteStardustBurst = (clickX, clickY) => {
      // Spawn 50 drifting white stardust dots (bintik-bintik putih berpendar ✦)
      const whiteDotsCount = 50;
      for (let i = 0; i < whiteDotsCount; i++) {
        const angle = (Math.PI * 2 * i) / whiteDotsCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 6.0 + 2.0;
        clickEffects.push({
          type: 'driftingWhiteDot',
          x: clickX + (Math.random() - 0.5) * 30,
          y: clickY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // gentle upward drifting bias
          size: Math.random() * 3.5 + 1.2,
          color: Math.random() > 0.2 ? '#ffffff' : '#f8fafc',
          alpha: 1,
          decay: Math.random() * 0.012 + 0.007,
          isStarSymbol: Math.random() > 0.4
        });
      }

      // Add expanding glowing white shockwave ring
      clickEffects.push({
        type: 'whiteShockwave',
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: 110,
        alpha: 0.95
      });
    };

    const handleMouseDown = (e) => {
      spawnWhiteStardustBurst(e.clientX, e.clientY);
    };

    const handleCardSpinBurst = (e) => {
      const clickX = e.detail?.x || width / 2;
      const clickY = e.detail?.y || height / 2;
      spawnWhiteStardustBurst(clickX, clickY);
    };

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      scrollSpeed = Math.min(delta * 0.4, 25);
      lastScrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('card-spin-burst', handleCardSpinBurst);
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

    // 4. Topographic Wave Offset
    let topoOffset = 0;

    // 5. Floating tech & space symbols
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

    // 6. Space Shooting Meteors
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

      // Decay scroll speed over time
      scrollSpeed *= 0.92;

      // A. Render Topographic GIS Contour Waves
      topoOffset += 0.008;
      ctx.beginPath();
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = `rgba(${primaryRgbStr}, 0.06)`;
      for (let x = 0; x < width; x += 15) {
        const y1 = height * 0.7 + Math.sin(x * 0.005 + topoOffset) * 28 + Math.cos(x * 0.003) * 15;
        if (x === 0) ctx.moveTo(x, y1);
        else ctx.lineTo(x, y1);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${secondaryRgbStr}, 0.04)`;
      for (let x = 0; x < width; x += 15) {
        const y2 = height * 0.74 + Math.sin(x * 0.004 - topoOffset) * 22 + Math.sin(x * 0.002) * 18;
        if (x === 0) ctx.moveTo(x, y2);
        else ctx.lineTo(x, y2);
      }
      ctx.stroke();

      // B. Render Pulsing GIS Satellite Radar Wave
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

      // C. Render Rotating Cyber Orbital Satellite Rings
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

      // D. Render Cosmic Constellation Lines
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

      // E. Render Laser Cursor Tether (Lines to 3 nearest stars)
      if (mouse.active) {
        // Find 3 nearest stars to cursor
        const starDistances = stars.map((s) => {
          const mdx = s.x - mouse.x;
          const mdy = s.y - mouse.y;
          return { star: s, dist: Math.sqrt(mdx * mdx + mdy * mdy) };
        });
        starDistances.sort((a, b) => a.dist - b.dist);

        const nearest = starDistances.slice(0, 3);
        nearest.forEach(({ star, dist }) => {
          if (dist < 180) {
            const tetherOpacity = (1 - dist / 180) * 0.35;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(star.x, star.y);
            ctx.strokeStyle = `rgba(${primaryRgbStr}, ${tetherOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      // F. Render Twinkling Stars with Interactive Mouse Repulsion & Scroll Warp Trails
      stars.forEach((s) => {
        s.y -= s.speedY + scrollSpeed * 0.4;
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

        // Render Star (Warp Trail line when scrolling fast, or circle when static)
        if (scrollSpeed > 2.5) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + scrollSpeed * 1.8);
          ctx.strokeStyle = `rgba(${primaryRgbStr}, ${s.alpha * 0.7})`;
          ctx.lineWidth = s.size * 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.fill();
        }
      });

      // G. Render Floating Tech & Space Code Symbols
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

      // H. Render Space Meteors (Shooting Stars)
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

      // I. Render Supernova Mouse Click Explosions
      for (let i = clickEffects.length - 1; i >= 0; i--) {
        const fx = clickEffects[i];

        if (fx.type === 'supernova') {
          fx.coreRadius += 3.8;
          fx.shockwaveRadius += 6.0;
          fx.alpha *= 0.93;
          fx.starFlareScale *= 0.91;

          const currentAlpha = Math.max(0, fx.alpha);

          // 1. Central Supernova Flash Core
          if (fx.coreRadius < fx.maxCoreRadius && currentAlpha > 0.03) {
            const grad = ctx.createRadialGradient(fx.x, fx.y, 0, fx.x, fx.y, fx.coreRadius);
            grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`);
            grad.addColorStop(0.3, `rgba(${primaryRgbStr}, ${currentAlpha * 0.75})`);
            grad.addColorStop(0.65, `rgba(${secondaryRgbStr}, ${currentAlpha * 0.4})`);
            grad.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }

          // 2. Exploding 4-Point Diffraction Star Flare Beams
          if (fx.starFlareScale > 0.06 && currentAlpha > 0.05) {
            const flareLength = 75 * fx.starFlareScale;
            ctx.save();
            ctx.translate(fx.x, fx.y);

            // Horizontal & Vertical major flare beams
            ctx.beginPath();
            ctx.moveTo(-flareLength, 0);
            ctx.lineTo(flareLength, 0);
            ctx.moveTo(0, -flareLength);
            ctx.lineTo(0, flareLength);
            ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
            ctx.lineWidth = 2.2 * fx.starFlareScale;
            ctx.stroke();

            // Diagonal secondary flare beams
            const diagLength = flareLength * 0.55;
            ctx.beginPath();
            ctx.moveTo(-diagLength, -diagLength);
            ctx.lineTo(diagLength, diagLength);
            ctx.moveTo(diagLength, -diagLength);
            ctx.lineTo(-diagLength, diagLength);
            ctx.strokeStyle = `rgba(${primaryRgbStr}, ${currentAlpha * 0.8})`;
            ctx.lineWidth = 1.4 * fx.starFlareScale;
            ctx.stroke();

            ctx.restore();
          }

          // 3. Dual Expanding Supernova Shockwave Rings
          if (fx.shockwaveRadius < fx.maxShockwaveRadius && currentAlpha > 0.02) {
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.shockwaveRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${primaryRgbStr}, ${currentAlpha * 0.8})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(fx.x, fx.y, Math.max(0, fx.shockwaveRadius * 0.65), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${secondaryRgbStr}, ${currentAlpha * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }

          // 4. Stardust Particles & Light Trails
          for (let pIdx = fx.particles.length - 1; pIdx >= 0; pIdx--) {
            const p = fx.particles[pIdx];
            const prevX = p.x;
            const prevY = p.y;

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.94;
            p.vy *= 0.94;
            p.alpha -= p.decay;

            if (p.alpha <= 0.02) {
              fx.particles.splice(pIdx, 1);
              continue;
            }

            const pAlpha = Math.max(0, p.alpha);

            // Light streak trail
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = pAlpha * 0.75;
            ctx.lineWidth = p.size * 0.75;
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Star spark dot / star symbol
            if (p.isStarShape) {
              ctx.font = `${Math.floor(p.size * 3.8)}px sans-serif`;
              ctx.fillStyle = p.color;
              ctx.globalAlpha = pAlpha;
              ctx.fillText('✦', p.x, p.y);
              ctx.globalAlpha = 1;
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = pAlpha;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }

          if (currentAlpha <= 0.02 && fx.particles.length === 0) {
            clickEffects.splice(i, 1);
          }
        } else if (fx.type === 'whiteShockwave') {
          fx.radius += 4.5;
          fx.alpha *= 0.92;

          if (fx.alpha <= 0.02 || fx.radius >= fx.maxRadius) {
            clickEffects.splice(i, 1);
            continue;
          }

          const ringAlpha = Math.max(0, fx.alpha);
          ctx.save();
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, fx.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha * 0.8})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = 12;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          // Inner subtle ring
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, Math.max(0, fx.radius - 14), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        } else if (fx.type === 'driftingWhiteDot') {
          fx.x += fx.vx;
          fx.y += fx.vy;
          fx.vx *= 0.96;
          fx.vy *= 0.96;
          fx.alpha -= fx.decay;

          if (fx.alpha <= 0.02) {
            clickEffects.splice(i, 1);
            continue;
          }

          const dotAlpha = Math.max(0, fx.alpha);
          ctx.save();
          ctx.globalAlpha = dotAlpha;

          if (fx.isStarSymbol) {
            ctx.font = `${Math.floor(fx.size * 3.8)}px sans-serif`;
            ctx.fillStyle = fx.color;
            ctx.fillText('✦', fx.x, fx.y);
          } else {
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.size, 0, Math.PI * 2);
            ctx.fillStyle = fx.color;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowBlur = 9;
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('card-spin-burst', handleCardSpinBurst);
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
