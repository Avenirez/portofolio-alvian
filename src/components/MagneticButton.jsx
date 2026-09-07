import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Tombol dengan efek "magnetic pull": narik dikit ke arah cursor saat
 * di-hover, lalu snap balik ke posisi semula pakai spring saat mouse
 * keluar. Lift + scale halus ditangani lewat framer-motion juga (bukan
 * CSS transform) supaya tidak rebutan property `transform` yang sama
 * dengan animasi magnetic-nya sendiri.
 */
export default function MagneticButton({ href, className, children, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const isTouchDevice = useRef(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    // Sama seperti CursorGlow.jsx: skip efek cursor-follow di touch device
    // karena tidak relevan dan cuma nambah beban main-thread.
    isTouchDevice.current = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice.current || !ref.current) return;
    // Ukur posisi tombol SEKALI saat cursor masuk, lalu dipakai ulang di
    // setiap handleMouseMove. Sebelumnya getBoundingClientRect() dipanggil
    // di tiap event mousemove -- operasi ini memaksa browser menghitung
    // ulang layout (forced reflow) dan jadi berat kalau nge-fire puluhan
    // kali per detik saat mouse bergerak di atas tombol.
    rectRef.current = ref.current.getBoundingClientRect();
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (isTouchDevice.current || !rectRef.current) return;
    const rect = rectRef.current;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * strength, y: relY * strength });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPos({ x: 0, y: 0 });
    rectRef.current = null;
  };

  const handleClick = (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: pos.x,
        y: pos.y - (isHovered ? 4 : 0),
        scale: isHovered ? 1.04 : 1
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.2 }}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.a>
  );
}


