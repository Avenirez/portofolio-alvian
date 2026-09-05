import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const figmaCategories = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Fullstack & GIS' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'frontend', label: 'Web App' }
];

export default function FilterSearch({ activeCategory, setActiveCategory }) {
  return (
    <div style={{
      maxWidth: '1140px',
      margin: '0 auto 40px auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '24px'
    }}>
      {/* Subtitle tag & Title in Sci-Fi HUD Bracket Frame */}
      <div className="hud-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        gap: '16px'
      }}>
        {/* Corner Brackets */}
        <span className="hud-corner hud-tl" />
        <span className="hud-corner hud-tr" />
        <span className="hud-corner hud-bl" />
        <span className="hud-corner hud-br" />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="hud-label">[SYS_SHOWCASE // V3.0]</span>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)'
            }}>
              PORTFOLIO SHOWCASE
            </span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Featured Projects
          </h2>
        </div>

        {/* 21st.dev Sliding Pill Category Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '4px',
          background: 'var(--bg-card)',
          padding: '6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          position: 'relative'
        }}>
          {figmaCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  position: 'relative',
                  padding: '8px 22px',
                  borderRadius: 'var(--radius-full)',
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-category-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--accent-gradient)',
                      boxShadow: '0 0 20px var(--accent-glow)',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

