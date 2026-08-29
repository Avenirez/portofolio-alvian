import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const requestRef = useRef(null);
  const mousePos = useRef({ x: -500, y: -500 });
  const isVisible = useRef(false);

  useEffect(() => {
    // Perangkat layar sentuh (HP/tablet) tidak punya cursor, jadi efek ini
    // tidak relevan di sana. Skip pemasangan listener supaya tidak menambah
    // beban kerja main-thread di perangkat yang biasanya juga lebih lemah.
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        if (glowRef.current) {
          glowRef.current.style.opacity = '0.65';
        }
      }

      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${mousePos.current.x - 225}px, ${mousePos.current.y - 225}px, 0)`;
          }
          requestRef.current = null;
        });
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%)',
        transform: 'translate3d(-500px, -500px, 0)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  );
}

