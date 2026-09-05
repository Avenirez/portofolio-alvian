import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

function TypewriterTitle({ name = personalInfo.name }) {
  const fullText = `Hi, I'm ${name}`;
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && charCount < fullText.length) {
      // Typing phase
      timeout = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, 70);
    } else if (!isDeleting && charCount === fullText.length) {
      // Hold phase: 3 seconds
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && charCount > 0) {
      // Erasing phase
      timeout = setTimeout(() => {
        setCharCount((prev) => prev - 1);
      }, 35);
    } else if (isDeleting && charCount === 0) {
      // Restart loop
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, fullText.length]);

  const currentText = fullText.slice(0, charCount);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)',
        fontWeight: '800',
        lineHeight: 1.15,
        marginBottom: '12px',
        letterSpacing: '-0.02em',
        color: '#ffffff',
        display: 'inline-flex',
        alignItems: 'baseline',
        flexWrap: 'wrap'
      }}
    >
      <span className="text-shimmer">{currentText}</span>
      <span className="typing-cursor" />
    </motion.h1>
  );
}

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

        {/* Left Column: Mac VS Code Terminal Window & Bio */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
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
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)'
              }}>
                LOOKING FOR FREELANCE WORK
              </span>
            </div>
          </motion.div>

          {/* Terminal Code Window Container */}
          <motion.div variants={itemVariants} className="terminal-window">
            
            {/* Terminal Header with Traffic Dots & File Tab Title */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <div className="terminal-tab">
                alvian_bio.config.ts
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'Space Grotesk' }}>
                UTF-8
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              {/* Main Title with Coding Typing Animation */}
              <TypewriterTitle name={personalInfo.name} />

              {/* Subtitle / Tagline */}
              <motion.h2 variants={itemVariants} style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)',
                fontWeight: '700',
                marginBottom: '16px',
                lineHeight: 1.3
              }}>
                <span className="gradient-text">{personalInfo.role}</span>
              </motion.h2>

              {/* Bio Description */}
              <motion.p variants={itemVariants} style={{
                fontSize: '0.98rem',
                color: 'var(--text-muted)',
                marginBottom: '28px',
                maxWidth: '540px',
                lineHeight: 1.7
              }}>
                {personalInfo.bio}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <MagneticButton href="#projek" className="btn-shimmer">
                  Explore Projects
                </MagneticButton>

                <MagneticButton href="#kontak" className="btn-border-magic">
                  <span className="btn-border-magic-inner">
                    Contact Me
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
          </motion.div>
        </motion.div>

        {/* Right Column: Circular Avatar Only (No Outer Rectangular Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0'
          }}
        >
          {/* Dynamic Halo Glow behind circle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(35px)',
            zIndex: 0
          }} />

          {/* Circular Monogram Container with Border Beam running on the circle */}
          <div className="animate-float" style={{
            position: 'relative',
            width: '210px',
            height: '210px',
            borderRadius: '50%',
            padding: '3px',
            background: 'var(--bg-card)',
            boxShadow: '0 0 35px var(--accent-glow)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <BorderBeam size={160} duration={6} borderRadius="50%" />
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5.5rem',
              fontWeight: '900',
              fontFamily: 'Space Grotesk',
              position: 'relative',
              zIndex: 2
            }}>
              <span className="gradient-text">A</span>
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', zIndex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-main)' }}>
              {personalInfo.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {personalInfo.location}
            </p>
          </div>
        </motion.div>



      </div>

      <style>{`
        .typing-cursor {
          display: inline-block;
          width: 4px;
          height: 0.85em;
          background-color: var(--accent-primary);
          margin-left: 6px;
          vertical-align: middle;
          border-radius: 2px;
          box-shadow: 0 0 10px var(--accent-primary);
          animation: blinkCursor 0.75s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
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
