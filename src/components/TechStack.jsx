import React from 'react';
import { motion } from 'framer-motion';

const techBadges = [
  { name: 'React', icon: '/icons/react.svg', url: 'https://react.dev' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', url: 'https://nextjs.org' },
  { name: 'Astro', icon: '/icons/astro.svg', url: 'https://astro.build' },
  { name: 'Svelte', icon: '/icons/svelte.svg', url: 'https://svelte.dev' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', url: 'https://nodejs.org' },
  { name: 'Supabase', icon: '/icons/supabase.svg', url: 'https://supabase.com' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', url: 'https://www.postgresql.org' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', url: 'https://tailwindcss.com' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', url: 'https://www.typescriptlang.org' },
  { name: 'QRIS Payment Gateway', icon: '/qris-logo.svg', url: 'https://qris.id' },
  { name: 'FastAPI', icon: '/icons/fastapi.svg', url: 'https://fastapi.tiangolo.com' },
  { name: 'OpenStreetMap API', icon: '/icons/openstreetmap.svg', url: 'https://www.openstreetmap.org' },
  { name: 'Leaflet GL', icon: '/icons/leaflet.svg', url: 'https://leafletjs.com' },
  { name: 'Vite', icon: '/icons/vite.svg', url: 'https://vite.dev' },
  { name: 'Framer Motion', icon: '/icons/framer.svg', url: 'https://motion.dev' },
  { name: 'Vercel Cloud', icon: '/icons/vercel.svg', url: 'https://vercel.com' },
  { name: 'Figma', icon: '/icons/figma.svg', url: 'https://www.figma.com' }
];

const row1 = techBadges.slice(0, 9);
const row2 = techBadges.slice(9);

export default function TechStack() {
  return (
    <section id="keahlian" aria-label="Keahlian dan Teknologi" style={{
      padding: '70px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      position: 'relative'
    }}>
      {/* Tech Stack Header with Sci-Fi HUD Brackets */}
      <div className="hud-container" style={{
        textAlign: 'center',
        marginBottom: '36px',
        maxWidth: '840px',
        marginInline: 'auto'
      }}>
        <span className="hud-corner hud-tl" />
        <span className="hud-corner hud-tr" />
        <span className="hud-corner hud-bl" />
        <span className="hud-corner hud-br" />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="hud-label">[SYS_TECH_STACK // ACTIVE]</span>
        </div>

        <h3 style={{
          fontSize: '1.6rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          letterSpacing: '-0.01em'
        }}>
          Tech Stack & Ekosistem Teknologi
        </h3>
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          marginTop: '8px',
          maxWidth: '580px',
          marginInline: 'auto',
          lineHeight: '1.6'
        }}>
          Kombinasi framework, tools, dan infrastruktur modern yang saya gunakan dalam membangun aplikasi web berperforma tinggi.
        </p>
      </div>


      {/* 21st.dev Infinite Marquee Tickers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Row 1: Left Scroll */}
        <div className="marquee-container">
          <div className="marquee-track-left">
            {[...row1, ...row1, ...row1].map((tech, index) => (
              <a
                key={`r1-${tech.name}-${index}`}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    whiteSpace: 'nowrap'
                  }}
                  className="tech-pill-card"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    style={{
                      width: '22px',
                      height: '22px',
                      objectFit: 'contain'
                    }}
                  />
                  <span>{tech.name}</span>
                </motion.div>
              </a>
            ))}
          </div>
        </div>

        {/* Row 2: Right Scroll */}
        <div className="marquee-container">
          <div className="marquee-track-right">
            {[...row2, ...row2, ...row2].map((tech, index) => (
              <a
                key={`r2-${tech.name}-${index}`}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    whiteSpace: 'nowrap'
                  }}
                  className="tech-pill-card"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    style={{
                      width: '22px',
                      height: '22px',
                      objectFit: 'contain'
                    }}
                  />
                  <span>{tech.name}</span>
                </motion.div>
              </a>
            ))}
          </div>
        </div>

      </div>


      <style>{`
        .tech-pill-card:hover {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 8px 25px var(--accent-glow) !important;
        }
      `}</style>
    </section>
  );
}

