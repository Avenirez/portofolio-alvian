import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const figmaCategories = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Fullstack & GIS' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'frontend', label: 'Web App' }
];

export default function FilterSearch({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchQuery]);

  return (
    <div style={{
      maxWidth: '1140px',
      margin: '0 auto 36px auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Subtitle tag & Title in Sci-Fi HUD Bracket Frame */}
      <div className="hud-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Corner Brackets */}
        <span className="hud-corner hud-tl" />
        <span className="hud-corner hud-tr" />
        <span className="hud-corner hud-bl" />
        <span className="hud-corner hud-br" />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
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
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Featured Projects
          </h2>
        </div>


        {/* Right side: Search Bar & 21st.dev Category Sliding Pill Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)'
            }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* 21st.dev Sliding Pill Category Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-card)',
            padding: '4px',
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
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    background: 'transparent',
                    border: 'none',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.84rem',
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
    </div>
  );
}

