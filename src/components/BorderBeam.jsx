import React from 'react';

/**
 * BorderBeam - 21st.dev / Magic UI inspired component
 * Animates a glowing neon beam moving continuously along the border of a parent container.
 */
export default function BorderBeam({
  size = 180,
  duration = 6,
  delay = 0,
  colorFrom = 'var(--accent-primary)',
  colorTo = 'var(--accent-secondary)',
  borderWidth = 1.5,
  borderRadius = 'var(--radius-lg)'
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: borderRadius,
        pointerEvents: 'none',
        padding: `${borderWidth}px`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        zIndex: 10
      }}
    >
      <div
        style={{
          position: 'absolute',
          aspectRatio: '1',
          width: `${size}px`,
          top: 0,
          left: 0,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo}, transparent)`,
          borderRadius: '50%',
          filter: 'blur(4px)',
          animation: `borderBeamSpin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          offsetPath: `rect(0 100% 100% 0 round ${size}px)`
        }}
      />
      <style>{`
        @keyframes borderBeamSpin {
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}
