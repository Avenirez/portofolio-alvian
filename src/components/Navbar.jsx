import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'projek', label: 'Projek' },
  { id: 'keahlian', label: 'Keahlian' },
  { id: 'kontak', label: 'Kontak' }
];

export default function Navbar({ currentTheme, setTheme, onGoHome }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const themeOptions = [
    { id: 'cyberneon', name: 'Cyber Neon Cyan', color: '#00f2fe' },
    { id: 'sunset', name: 'Sunset Amber & Pink', color: '#f59e0b' },
    { id: 'cyberpunk', name: 'Cyberpunk Violet', color: '#8b5cf6' },
    { id: 'emerald', name: 'Midnight Emerald', color: '#10b981' },
    { id: 'ocean', name: 'Deep Ocean Blue', color: '#3b82f6' }
  ];

  // Scroll-spy: hitung posisi persis section mana yang aktif di layar
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;

      if (window.scrollY < 250) {
        setActiveSection('');
        return;
      }

      const scrollPosition = window.scrollY + 140;
      let currentSection = '';

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 80) {
            currentSection = item.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="glass-nav" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px 24px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            setActiveSection('');
            if (onGoHome) {
              onGoHome();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          title="Kembali ke Halaman Utama"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-main)',
            fontSize: '1.25rem',
            fontWeight: '800',
            cursor: 'pointer'
          }}
        >
          <span>Alvian<span className="gradient-text">Dev</span></span>
        </a>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }} className="desktop-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="nav-link"
                style={{
                  position: 'relative',
                  paddingBottom: '6px',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: '2px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--accent-gradient)'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Controls (Theme Switcher) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Theme Palette Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Ganti Tema Warna"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '8px 14px',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                title="Kombinasi 5 Warna Tema"
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f2fe', boxShadow: '0 0 4px #00f2fe' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 4px #f59e0b' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', boxShadow: '0 0 4px #8b5cf6' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 4px #10b981' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 4px #3b82f6' }} />
              </div>
              <span className="theme-label-text">Tema Website</span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '210px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                    zIndex: 1100,
                    transformOrigin: 'top right'
                  }}
                >
                  <div style={{
                    padding: '6px 10px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Pilih Aksen Warna
                  </div>
                  {themeOptions.map((option, i) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => {
                        setTheme(option.id);
                        setThemeDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: currentTheme === option.id ? 'var(--accent-light)' : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        color: currentTheme === option.id ? 'var(--accent-primary)' : 'var(--text-main)',
                        fontWeight: currentTheme === option.id ? '700' : '500',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s ease, color 0.2s ease'
                      }}
                    >
                      <span style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: option.color,
                        boxShadow: `0 0 8px ${option.color}`
                      }} />
                      {option.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Nav Links Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
            className="mobile-links"
          >
            <div style={{
              padding: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              borderTop: '1px solid var(--border-color)',
              marginTop: '12px'
            }}>
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item.id);
                  }}
                  className="nav-link"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--accent-primary);
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .theme-label-text {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
