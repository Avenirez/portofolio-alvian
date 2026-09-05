import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Download, Mail } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/projectsData';
import MagneticButton from './MagneticButton';
import HeroBackground from './HeroBackground';
import BorderBeam from './BorderBeam';

// Stagger container untuk seluruh kolom kiri (badge -> judul -> bio -> CTA -> sosial)
const columnVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// Sub-stagger khusus untuk judul nama, supaya muncul per kata
const titleVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection() {
  const nameWords = personalInfo.name.split(' ');

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '130px 24px 70px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 21st.dev Grid & Meteor Background */}
      <HeroBackground />

      <div style={{
        maxWidth: '1140px',
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '48px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }} className="hero-grid">

        {/* Left Column: Mac VS Code Terminal Window */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative' }}
        >
          {/* Terminal Code Window Container */}
          <div className="terminal-window" style={{ position: 'relative', marginTop: '14px' }}>
            
            {/* Terminal Header with Traffic Dots & Tab Title */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <div className="terminal-tab">
                <span>⚡</span> alvian_bio.config.ts
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'Space Grotesk' }}>
                UTF-8
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              {/* Floating Shiny Badge Anchor */}
              <div style={{
                position: 'absolute',
                top: '-22px',
                right: '24px',
                zIndex: 10
              }}>
                <div className="shiny-pill-badge">
                  <span style={{ position: 'relative', width: '8px', height: '8px', display: 'inline-block', color: 'var(--accent-primary)' }}>
                    <span className="radar-ping" />
                    <span style={{
                      position: 'relative',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      boxShadow: '0 0 10px var(--accent-primary)',
                      display: 'block'
                    }} />
                  </span>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-primary)'
                  }}>
                    LOOKING FOR FREELANCE WORK
                  </span>
                </div>
              </div>

              {/* Code Line Numbers & Main Title */}
              <motion.h1
                variants={titleVariants}
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
                  fontWeight: '800',
                  lineHeight: 1.1,
                  marginBottom: '14px',
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}
              >
                Hi, I'm <span className="text-shimmer">{personalInfo.name}</span>
              </motion.h1>

              {/* Subtitle / Tagline */}
              <motion.h2 variants={itemVariants} style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                fontWeight: '700',
                marginBottom: '18px',
                lineHeight: 1.3
              }}>
                <span className="gradient-text">{personalInfo.role}</span>
              </motion.h2>

              {/* Bio Description */}
              <motion.p variants={itemVariants} style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginBottom: '32px',
                maxWidth: '560px',
                lineHeight: 1.7
              }}>
                {personalInfo.bio}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '18px',
                alignItems: 'center',
                marginBottom: '28px'
              }}>
                <MagneticButton href="#projek" className="btn-shimmer">
                  Explore Projects <ArrowRight size={18} />
                </MagneticButton>

                <MagneticButton href="#kontak" className="btn-border-magic">
                  <span className="btn-border-magic-inner">
                    Contact Me <Mail size={18} />
                  </span>
                </MagneticButton>
              </motion.div>

              {/* Quick Social Links */}
              <motion.div variants={itemVariants} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '600' }}>CONNECT:</span>
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                  <LinkedinIcon size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Asymmetrical Cut-Corner Chamfer Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          {/* Dynamic Halo Glow behind frame */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(35px)',
            zIndex: 0
          }} />

          {/* Asymmetrical Cut-Corner Card */}
          <div className="chamfer-card animate-float" style={{
            width: '100%',
            maxWidth: '380px',
            padding: '28px',
            textAlign: 'center',
            position: 'relative',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-hover)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 30px var(--accent-glow)',
            zIndex: 1
          }}>
            <BorderBeam size={200} duration={8} borderRadius="var(--radius-lg)" />

            {/* Avatar Frame with Glowing Ring */}
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              margin: '0 auto 20px auto',
              position: 'relative',
              padding: '4px',
              background: 'var(--accent-gradient)',
              boxShadow: '0 0 25px var(--accent-glow)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4.5rem'
              }}>
                👨‍💻
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-main)' }}>
              {personalInfo.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />
              {personalInfo.location}
            </p>
          </div>
        </motion.div>


      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid div {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
