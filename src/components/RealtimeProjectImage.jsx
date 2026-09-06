import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RealtimeProjectImage({
  demoUrl,
  alt = 'Project preview',
  style = {},
  className = '',
  layoutId = null,
  showLiveBadge = false
}) {
  const [providerIndex, setProviderIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // List of real-time live website snapshot providers
  const getProviders = (url) => {
    if (!url) return [];
    const encoded = encodeURIComponent(url);
    return [
      `https://api.microlink.io/?url=${encoded}&screenshot=true&embed=screenshot.url`,
      `https://s.wordpress.com/mshots/v1/${encoded}?w=1200&h=800`,
      `https://image.thum.io/get/width/1200/crop/800/${url}`,
      `https://mini.s-shot.ru/1280x800/PNG/1280/Z100/?${encoded}`
    ];
  };

  const providers = getProviders(demoUrl);
  const currentSrc = providers[providerIndex] || '';

  useEffect(() => {
    setProviderIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [demoUrl]);

  const handleError = () => {
    if (providerIndex < providers.length - 1) {
      setProviderIndex((prev) => prev + 1);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const Component = layoutId ? motion.img : 'img';
  const imgProps = layoutId ? { layoutId } : {};

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}>
      {/* Loading Skeleton with Shimmer */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(110deg, #0e1322 8%, #1a2238 18%, #0e1322 33%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.65)',
            padding: '6px 14px',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-glow)',
              animation: 'pulse 1.5s infinite'
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.5px' }}>
              Memuat Pratinjau...
            </span>
          </div>
        </div>
      )}

      {/* Realtime Image */}
      {!hasError && currentSrc ? (
        <Component
          {...imgProps}
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          loading="lazy"
          className={className}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.4s ease, transform 0.5s ease',
            ...style
          }}
        />
      ) : (
        /* Fallback if all real-time snapshot services fail */
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#94a3b8',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#e2e8f0' }}>
            {alt}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Source: {demoUrl}
          </span>
        </div>
      )}

      {/* Badge overlay if explicitly enabled */}
      {showLiveBadge && !isLoading && !hasError && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(5, 8, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-color)',
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '0.68rem',
          fontWeight: '700',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          zIndex: 3,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            boxShadow: '0 0 8px var(--accent-glow)'
          }} />
          LIVE
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
