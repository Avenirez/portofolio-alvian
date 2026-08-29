import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--accent-gradient)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 10001,
        boxShadow: '0 0 10px var(--accent-glow)',
        willChange: 'transform'
      }}
    />
  );
}

