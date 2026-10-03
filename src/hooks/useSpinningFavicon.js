import { useEffect } from 'react';

export default function useSpinningFavicon(imageUrl = '/favicon.png', speedMs = 500) {
  useEffect(() => {
    let faviconIntervalId;
    let titleIntervalId;
    let step = 0;
    
    // ==========================================
    // 1. SETUP FAVICON
    // ==========================================
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = 'anonymous'; 
    img.src = imageUrl;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // ==========================================
    // 2. SETUP TITLE TYPEWRITER
    // ==========================================
    const fullTitle = "Portofolio Alvian Ariadi";
    let titleIndex = 0;

    const animateTitle = () => {
      if (titleIndex <= fullTitle.length) {
        // Mengetik huruf per huruf, ditambah kursor "|"
        document.title = fullTitle.substring(0, titleIndex) + (titleIndex < fullTitle.length ? "|" : "");
        titleIndex++;
      } else {
        // Tahan teks penuh selama beberapa detik sambil mengedipkan kursor
        if (titleIndex > fullTitle.length + 10) { 
          titleIndex = 1; // Mulai ngetik dari huruf pertama lagi
        } else {
          titleIndex++;
          document.title = fullTitle + (titleIndex % 2 === 0 ? "|" : "");
        }
      }
    };

    // Mulai animasi mengetik (kecepatan 200ms per huruf)
    titleIntervalId = setInterval(animateTitle, 200);

    // ==========================================
    // 3. ANIMASI FAVICON (SAAT GAMBAR LOADED)
    // ==========================================
    img.onload = () => {
      const drawFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        
        // Memastikan avatar tetap berbentuk bulat
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Render Avatar Normal
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        ctx.restore();

        // Logika berkedip (Blinking Notification Dot)
        const showDot = step % 4 < 2;

        if (showDot) {
          ctx.beginPath();
          // Titik hijau di pojok kanan atas
          ctx.arc(27, 5, 4, 0, Math.PI * 2, true);
          ctx.fillStyle = '#22c55e'; // Hijau terang
          ctx.fill();
          
          // Border luar putih/hitam
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#000000';
          ctx.stroke();
          ctx.closePath();
        }

        link.href = canvas.toDataURL('image/png');
        step++;
      };

      // Interval favicon (500ms)
      faviconIntervalId = setInterval(drawFrame, speedMs);
    };

    return () => {
      // Bersihkan semua interval agar tidak bocor
      clearInterval(faviconIntervalId);
      clearInterval(titleIntervalId);
      link.href = imageUrl;
      document.title = fullTitle; // Kembalikan title ke normal jika keluar
    };
  }, [imageUrl, speedMs]);
}

