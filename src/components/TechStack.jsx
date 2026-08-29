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

export default function TechStack() {
  return (
    <section id="keahlian" style={{
      padding: '50px 24px',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '28px'
      }}>
        <h3 style={{
          fontSize: '1.35rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          letterSpacing: '-0.01em'
        }}>
          Tech Stack & Ekosistem Teknologi
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginTop: '8px',
          maxWidth: '560px',
          marginInline: 'auto',
          lineHeight: '1.6'
        }}>
          Kombinasi framework, tools, dan infrastruktur modern yang saya gunakan dalam membangun aplikasi web berperforma tinggi.
        </p>
      </div>

      {/* Centered Multi-Row Tech Pill Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '14px 16px',
        maxWidth: '960px',
        margin: '0 auto'
      }}>
        {techBadges.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            whileHover={{ 
              scale: 1.06, 
              y: -2,
              transition: { type: 'spring', stiffness: 500, damping: 25 }
            }}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
              cursor: 'default',
              backdropFilter: 'blur(10px)',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease'
            }}
            className="tech-pill-card"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain',
                filter: tech.name === 'Next.js' ? 'none' : 'drop-shadow(0 0 4px rgba(255,255,255,0.15))'
              }}
            />
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </div>

      <style>{`
        .tech-pill-card:hover {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 6px 20px var(--accent-glow) !important;
        }
      `}</style>
    </section>
  );
}
