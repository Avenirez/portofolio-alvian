import React from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { personalInfo } from '../data/projectsData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
