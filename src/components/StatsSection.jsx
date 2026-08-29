import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Briefcase, Users, Code, Award } from 'lucide-react';
import { personalInfo } from '../data/projectsData';

/**
 * Angka yang "menghitung" dari 0 ke nilai aslinya saat masuk viewport.
 * Robust terhadap value berupa string campuran seperti "3+" (parse
 * bagian angkanya untuk animasi, sisanya dipakai sebagai trailing text).
 */
function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState(0);

  const stringValue = String(value);
  const numericTarget = parseFloat(stringValue.replace(/[^0-9.]/g, '')) || 0;
  const trailingText = stringValue.replace(/^[0-9.]+/, '');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numericTarget, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return () => controls.stop();
  }, [isInView, numericTarget]);

  return (
    <span ref={ref}>
      {displayValue}{trailingText}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const statItems = [
    { label: 'Projek Selesai', value: personalInfo.stats.projectsCompleted, icon: Briefcase, suffix: '+' },
    { label: 'Klien Satisfied', value: personalInfo.stats.satisfiedClients, icon: Users, suffix: '+' },
    { label: 'Tahun Pengalaman', value: personalInfo.stats.yearsExperience, icon: Award, suffix: '' },
    { label: 'Teknologi Dikuasai', value: personalInfo.stats.technologiesMastered, icon: Code, suffix: '+' }
  ];

  return (
    <section id="statistik" style={{
      padding: '60px 24px',
      maxWidth: '1100px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {statItems.map((item, index) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card"
              style={{
                padding: '28px 24px',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: 'var(--accent-primary)',
                border: '1px solid var(--accent-glow)'
              }}>
                <IconComp size={26} />
              </div>

              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                lineHeight: 1,
                marginBottom: '6px'
              }} className="gradient-text">
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </div>

              <div style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                {item.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
