import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import BorderBeam from './BorderBeam';

export default function ProjectCard({ project, index, onSelectProject }) {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);
  const lastEventRef = useRef(null);

  const isBentoHero = index === 0;

  // Motion values for tilt and spotlight position
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOpacity = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 450 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const opacitySpring = useSpring(spotOpacity, springConfig);

  const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${spotX}% ${spotY}%, var(--accent-light), transparent 80%)`;

  const applyPointerFrame = () => {
    rafRef.current = null;
    const rect = rectRef.current;
    const e = lastEventRef.current;
    if (!rect || !e) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    spotX.set(xPercent);
    spotY.set(yPercent);
    spotOpacity.set(1);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rawRotateX.set(((y - centerY) / centerY) * -7);
    rawRotateY.set(((x - centerX) / centerX) * 7);
  };

  const handleMouseEnter = () => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;
    lastEventRef.current = e;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(applyPointerFrame);
    }
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    rawRotateX.set(0);
    rawRotateY.set(0);
    spotOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >

      {/* 21st.dev Border Beam for Featured or Highlighted cards */}
      {project.featured && (
        <BorderBeam size={160} duration={6} borderRadius="var(--radius-md)" />
      )}

      {/* Dynamic Spotlight Glow Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: opacitySpring,
          background: spotlightBackground
        }}
      />


      {/* Thumbnail Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        overflow: 'hidden',
        background: 'var(--bg-secondary)'
      }}>
        <motion.img
          layoutId={`project-image-${project.id}`}
          src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.demoUrl)}?w=1200&h=800`}
          onError={(e) => {
            if (!e.target.dataset.triedLocal) {
              e.target.dataset.triedLocal = 'true';
              e.target.src = project.image;
            }
          }}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="project-img"
        />

        {/* Overlay Dark Gradient on Hover */}
        <div className="card-overlay" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8, 10, 18, 0.92) 0%, rgba(8, 10, 18, 0.68) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: 0,
          transition: 'opacity 0.25s ease',
          zIndex: 3
        }}>
          <button
            onClick={() => onSelectProject(project)}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem', clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
          >
            Detail Projek
          </button>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'var(--accent-gradient)',
            color: '#ffffff',
            padding: '4px 12px',
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
            fontSize: '0.75rem',
            fontWeight: '700',
            boxShadow: '0 4px 12px var(--accent-glow)',
            zIndex: 3
          }}>
            Featured
          </div>
        )}

        {/* Category Label */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: '600',
          zIndex: 3
        }}>
          {project.categoryLabel}
        </div>
      </div>

      {/* Content Info */}
      <div style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        zIndex: 3
      }}>
        <div>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            marginBottom: '10px',
            color: 'var(--text-main)'
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '18px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6
          }}>
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px'
          }}>
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-dim)',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)'
              }}>
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                padding: '3px 6px'
              }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => onSelectProject(project)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Lihat Selengkapnya &rarr;
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={project.demoUrl} target="_blank" rel="noreferrer" title="Live Demo" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}>
                Demo &rarr;
              </a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .glass-card:hover .project-img {
          transform: scale(1.08);
        }
        .glass-card:hover .card-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  );
}

