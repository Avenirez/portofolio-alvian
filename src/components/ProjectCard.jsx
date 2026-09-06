import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import BorderBeam from './BorderBeam';

export default function ProjectCard({ project, index, onSelectProject, onCardInteract }) {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);
  const lastEventRef = useRef(null);
  const [spinRotation, setSpinRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

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
    if (!rect || !e || isSpinning) return;

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
    if (!rectRef.current || isSpinning) return;
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

  const handleCardClick = (e) => {
    // Notify parent to pause auto-slide temporarily
    if (onCardInteract) {
      onCardInteract();
    }

    // Trigger white stardust dots burst event on global background
    const rect = cardRef.current ? cardRef.current.getBoundingClientRect() : null;
    const centerX = rect ? rect.left + rect.width / 2 : e.clientX;
    const centerY = rect ? rect.top + rect.height / 2 : e.clientY;
    window.dispatchEvent(new CustomEvent('card-spin-burst', {
      detail: { x: centerX, y: centerY }
    }));

    if (isSpinning) return;

    // Reset mouse tilt springs during 360 spin
    rawRotateX.set(0);
    rawRotateY.set(0);

    setIsSpinning(true);
    setSpinRotation((prev) => prev + 360);

    setTimeout(() => {
      setIsSpinning(false);
    }, 800);
  };

  return (
    <div style={{ perspective: '1200px', width: '100%', height: '100%' }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, rotateY: spinRotation }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileTap={{ scale: 0.97 }}
        transition={{
          rotateY: { duration: 0.8, ease: [0.34, 1.25, 0.64, 1] },
          default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          cursor: 'grab'
        }}
      >
        <div
          className="glass-card"
          style={{
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
          }}
        >
        {/* 21st.dev Border Beam for Featured or Highlighted cards */}
        {project.featured && (
          <BorderBeam size={160} duration={6} borderRadius="var(--radius-md)" />
        )}

        {/* Glass Glare Shimmer Sweep Overlay */}
        <div className="card-glare-shimmer" />

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

        {/* Thumbnail Container with 3D Parallax Depth */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          transform: 'translateZ(10px)',
          transformStyle: 'preserve-3d'
        }}>
          <motion.img
            layoutId={`project-image-${project.id}`}
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.demoUrl.includes('?') ? project.demoUrl : `${project.demoUrl}${project.demoUrl.endsWith('/') ? '' : '/'}?v=live`)}?w=1200&h=800`}
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
              onClick={(e) => {
                e.stopPropagation();
                if (onCardInteract) onCardInteract();
                onSelectProject(project);
              }}
              className="btn-primary"
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem',
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                transform: 'translateZ(45px)',
                boxShadow: '0 8px 25px var(--accent-glow)'
              }}
            >
              Detail Projek
            </button>
          </div>

          {/* Featured Badge with 3D Parallax Depth */}
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
              boxShadow: '0 6px 18px var(--accent-glow)',
              zIndex: 4,
              transform: 'translateZ(35px)'
            }}>
              Featured
            </div>
          )}

          {/* Category Label with 3D Parallax Depth */}
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
            zIndex: 4,
            transform: 'translateZ(30px)'
          }}>
            {project.categoryLabel}
          </div>
        </div>

        {/* Content Info with 3D Parallax Depth */}
        <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
          zIndex: 3,
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '10px',
              color: 'var(--text-main)',
              transform: 'translateZ(25px)'
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
              lineHeight: 1.6,
              transform: 'translateZ(15px)'
            }}>
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Badges with 3D Parallax Depth */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '20px',
              transform: 'translateZ(28px)'
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
              borderTop: '1px solid var(--border-color)',
              transform: 'translateZ(30px)'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onCardInteract) onCardInteract();
                  onSelectProject(project);
                }}
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
                Lihat Selengkapnya
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Live Demo"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onCardInteract) onCardInteract();
                  }}
                  style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}
                >
                  Demo
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .glass-card .card-glare-shimmer {
            position: absolute;
            top: 0;
            left: -150%;
            width: 70%;
            height: 100%;
            background: linear-gradient(110deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%);
            transform: skewX(-25deg);
            pointer-events: none;
            z-index: 5;
            transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .glass-card:hover .card-glare-shimmer {
            transform: translateX(450%) skewX(-25deg);
          }
          .glass-card:hover .project-img {
            transform: scale(1.08);
          }
          .glass-card:hover .card-overlay {
            opacity: 1 !important;
          }
          .glass-card:active {
            border-color: var(--accent-primary) !important;
            box-shadow: 0 0 35px var(--accent-glow), 0 10px 30px rgba(0, 0, 0, 0.8) !important;
          }
        `}</style>
      </div>
    </motion.div>
  </div>
  );
}

