import React from 'react';
import { motion } from 'framer-motion';

const techBadges = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Astro', icon: 'https://cdn.simpleicons.org/astro/FF5D01' },
  { name: 'Svelte', icon: 'https://cdn.simpleicons.org/svelte/FF3E00' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'QRIS Payment Gateway', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'OpenStreetMap API', icon: 'https://cdn.simpleicons.org/openstreetmap/7EBC6F' },
  { name: 'Leaflet GL', icon: 'https://cdn.simpleicons.org/leaflet/199900' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/0055FF' },
  { name: 'Vercel Cloud', icon: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' }
];

const row1 = techBadges.slice(0, 8);
const row2 = techBadges.slice(8);

export default function TechStack() {
  return (
    <section id="keahlian" style={{
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
              <motion.div
                key={`r1-${tech.name}-${index}`}
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
            ))}
          </div>
        </div>

        {/* Row 2: Right Scroll */}
        <div className="marquee-container">
          <div className="marquee-track-right">
            {[...row2, ...row2, ...row2].map((tech, index) => (
              <motion.div
                key={`r2-${tech.name}-${index}`}
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

