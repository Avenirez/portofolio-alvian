import React from 'react';
import { personalInfo } from '../data/projectsData';

export default function Footer({ onGoHome }) {
  const scrollToTop = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      padding: '40px 24px',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Brand Logo */}
        <div
          onClick={scrollToTop}
          title="Kembali ke Halaman Utama"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
            Alvian<span className="gradient-text">Dev</span>
          </span>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} {personalInfo.name}. Dirancang menggunakan React, Vite & Framer Motion.
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          title="Kembali ke atas"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            padding: '8px 16px',
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '700',
            transition: 'all 0.2s ease'
          }}
        >
          TOP ↑
        </button>
      </div>
    </footer>
  );
}
