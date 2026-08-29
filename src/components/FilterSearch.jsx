import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const figmaCategories = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Fullstack & GIS' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'frontend', label: 'Web App' }
];

export default function FilterSearch({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  // Nilai di kotak input dipisah dari searchQuery yang dipakai App.jsx untuk
  // memfilter. Kalau setSearchQuery langsung dipanggil di tiap ketikan,
  // grid project di bawah ikut animasi masuk/keluar (AnimatePresence) di
  // SETIAP huruf yang diketik -- kartu jadi "lompat-lompat" saat mengetik
  // cepat. Dengan debounce 300ms, kotak input tetap terasa instan (state
  // lokal), tapi filter+animasi grid baru jalan setelah user berhenti mengetik.
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
      {/* Subtitle tag & Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            display: 'block',
            marginBottom: '6px'
          }}>
            PORTFOLIO SHOWCASE
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Featured Projects
          </h2>
        </div>

        {/* Right side: Search Bar & Category Pills */}
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

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-card)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)'
          }}>
            {figmaCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'var(--accent-gradient)' : 'transparent',
                    border: 'none',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 15px var(--accent-glow)' : 'none'
                  }}
                >
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
