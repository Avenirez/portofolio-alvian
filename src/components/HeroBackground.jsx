import React from 'react';

export default function HeroBackground() {
  const meteors = [
    { top: '5%', left: '70%', width: '120px', duration: '4s', delay: '0.2s' },
    { top: '20%', left: '85%', width: '160px', duration: '5s', delay: '1.5s' },
    { top: '35%', left: '50%', width: '100px', duration: '3.5s', delay: '2.8s' },
    { top: '60%', left: '90%', width: '140px', duration: '4.8s', delay: '0.8s' },
    { top: '15%', left: '30%', width: '110px', duration: '4.2s', delay: '3.2s' }
  ];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {/* Cyber Grid Pattern Overlay */}
      <div
        className="cyber-grid-pattern"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.6
        }}
      />

      {/* Ambient Glowing Orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '380px',
        height: '380px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        filter: 'blur(70px)',
        opacity: 0.7
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        filter: 'blur(80px)',
        opacity: 0.5
      }} />

      {/* Meteor Light Sweeps */}
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor-line"
          style={{
            top: m.top,
            left: m.left,
            width: m.width,
            animationDuration: m.duration,
            animationDelay: m.delay
          }}
        />
      ))}
    </div>
  );
}
