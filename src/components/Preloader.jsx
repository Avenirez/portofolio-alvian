import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Proses Memuat Halaman...');

  useEffect(() => {
    let startTimestamp = null;
    const duration = 3500; // 3.5 seconds total duration for readable, smooth progression

    const updateProgress = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      
      // Smooth cubic-bezier-like easing curve so progression slows down gracefully in stages
      const progressRatio = Math.min(elapsed / duration, 1);
      // Easing: decelerate towards completion
      const easedRatio = 1 - Math.pow(1 - progressRatio, 2.2);
      const currentProgress = Math.min(Math.floor(easedRatio * 100), 100);

      setProgress(currentProgress);

      // Update formal status text based on selected ranges
      if (currentProgress < 30) {
        setStatusText('Proses Memuat Halaman...');
      } else if (currentProgress < 65) {
        setStatusText('Mengunduh Informasi Portofolio dan Proyek...');
      } else if (currentProgress < 95) {
        setStatusText('Menyiapkan Tampilan Interaktif...');
      } else if (currentProgress < 100) {
        setStatusText('Memvalidasi Seluruh Komponen...');
      } else {
        setStatusText('Selamat Datang di Portofolio Alvian Ariadi!');
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for 600ms so user can read final welcome status before smooth fade out
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#05070e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Background Dot Matrix Pattern */}
      <div
        className="global-dot-grid"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          pointerEvents: 'none'
        }}
      />

      {/* Cyber Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.5,
          pointerEvents: 'none'
        }}
      />

      {/* Main Preloader Card with HUD Corners */}
      <div
        className="hud-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          padding: '40px 32px',
          background: 'rgba(12, 15, 26, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px var(--accent-glow)'
        }}
      >
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />

        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            className="hud-label"
            style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.22em',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            [ ALVIAN ARIADI // PORTFOLIO ]
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}
          >
            Fullstack Web & GIS Engineer
          </div>
        </div>

        {/* Large Percentage Counter */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span
            className="gradient-text font-display"
            style={{
              fontSize: '3.6rem',
              fontWeight: '800',
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Cyber Neon Progress Bar Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '20px'
          }}
        >
          {/* Progress Bar Glow Fill */}
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 0 16px var(--accent-glow)',
              transition: 'width 0.08s linear'
            }}
          />
        </div>

        {/* Dynamic Status Message */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: progress === 100 ? 'var(--accent-primary)' : 'var(--text-main)',
            minHeight: '24px',
            transition: 'color 0.3s ease'
          }}
        >
          {statusText}
        </div>
      </div>
    </motion.div>
  );
}
