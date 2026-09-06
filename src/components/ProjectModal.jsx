import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Monitor, Image as ImageIcon } from 'lucide-react';
import RealtimeProjectImage from './RealtimeProjectImage';

export default function ProjectModal({ project, onClose }) {
  const [viewMode, setViewMode] = useState('snapshot'); // 'snapshot' | 'iframe'

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
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          zIndex: 10000,
          padding: '32px',
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
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
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
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

        {/* Preview Control Header */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setViewMode('snapshot')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: viewMode === 'snapshot' ? 'var(--accent-primary)' : 'var(--border-color)',
                background: viewMode === 'snapshot' ? 'var(--accent-light)' : 'var(--bg-input)',
                color: viewMode === 'snapshot' ? 'var(--accent-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <ImageIcon size={14} /> Snapshot Gambar
            </button>
            <button
              onClick={() => setViewMode('iframe')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: viewMode === 'iframe' ? 'var(--accent-primary)' : 'var(--border-color)',
                background: viewMode === 'iframe' ? 'var(--accent-light)' : 'var(--bg-input)',
                color: viewMode === 'iframe' ? 'var(--accent-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Monitor size={14} /> Live Interactive Web
            </button>
          </div>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Buka Website Direct <ExternalLink size={13} />
          </a>
        </div>

        {/* Project Preview (Snapshot or Live Iframe) */}
        <div style={{
          position: 'relative',
          clipPath: 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
          height: '400px',
          background: '#090d16'
        }}>
          {viewMode === 'snapshot' ? (
            <RealtimeProjectImage
              demoUrl={project.demoUrl}
              alt={project.title}
              layoutId={`project-image-${project.id}`}
              showLiveBadge={false}
            />
          ) : (
            <iframe
              src={project.demoUrl}
              title={project.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#ffffff'
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          )}
        </div>

        {/* Header Info */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            background: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            padding: '4px 14px',
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
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
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>
              Fitur Utama:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {project.keyFeatures.map((feature, i) => (
                <div key={i} style={{
                  background: 'var(--bg-input)',
                  padding: '12px 16px',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)'
                }}>
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
            padding: '16px 20px',
            clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
            marginBottom: '24px'
          }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>
              Tantangan & Solusi Teknis:
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {project.challenges}
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
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
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
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            Uji Coba Live Demo
          </a>
        </div>

      </motion.div>
    </div>
  );
}
