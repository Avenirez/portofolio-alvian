import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, AlertCircle, Layers } from 'lucide-react';


export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 7, 14, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      />

      {/* Modal Window Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass-modal"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 10000,
          padding: '32px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Project Screenshot HD — layoutId sama dengan thumbnail di ProjectCard
            supaya transisinya "magic move" dari card ke modal */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
          maxHeight: '380px'
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
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '380px',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Header Info */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            background: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '10px'
          }}>
            {project.categoryLabel}
          </span>

          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
            {project.title}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {project.fullDescription || project.description}
          </p>
        </div>

        {/* Key Features List */}
        {project.keyFeatures && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--accent-primary)" /> Fitur Utama:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {project.keyFeatures.map((feature, i) => (
                <div key={i} style={{
                  background: 'var(--bg-input)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  border: '1px solid var(--border-color)'
                }}>
                  <CheckCircle2 size={16} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Challenge Section */}
        {project.challenges && (
          <div style={{
            background: 'var(--accent-light)',
            border: '1px solid var(--accent-glow)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <AlertCircle size={20} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>
                Tantangan & Solusi Teknis:
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {project.challenges}
              </div>
            </div>
          </div>
        )}

        {/* Technologies Stack Pills */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Teknologi Yang Digunakan:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech, i) => (
              <span key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-hover)',
                color: 'var(--text-main)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)'
        }}>
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <ExternalLink size={18} /> Uji Coba Live Demo
          </a>
        </div>

      </motion.div>
    </div>
  );
}
