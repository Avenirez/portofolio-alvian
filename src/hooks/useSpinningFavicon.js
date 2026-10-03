import { useEffect } from 'react';

export default function useSpinningFavicon(imageUrl = '/favicon.png', speedMs = 100) {
  useEffect(() => {
    let intervalId;
    let angle = 0;
    
    const canvas = document.createElement('canvas');
    // Ukuran standar favicon adalah 32x32 agar ringan dirender
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    // Memastikan tidak ada masalah CORS saat memuat gambar
    img.crossOrigin = 'anonymous'; 
    img.src = imageUrl;

    // Mencari tag <link rel="icon"> di file index.html
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Saat gambar berhasil dimuat, mulai jalankan animasi
    img.onload = () => {
      const drawFrame = () => {
        // Hapus kanvas dari frame sebelumnya
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simpan state, pindah ke tengah, putar, lalu gambar avatar Anda
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        
        // Buat wajahnya menjadi bulat sempurna di tab (opsional)
        ctx.beginPath();
        ctx.arc(0, 0, canvas.width / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Gambar avatar
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.restore();

        // Terapkan hasil gambaran dari kanvas ke tab browser!
        link.href = canvas.toDataURL('image/png');

        // Tambah sudut putaran sebesar 10 derajat untuk frame selanjutnya
        angle = (angle + 10) % 360;
      };

      // Menjalankan fungsi drawFrame berulang-ulang seperti GIF
      intervalId = setInterval(drawFrame, speedMs);
    };

    return () => {
      // Bersihkan interval jika komponen dihancurkan (best practice React)
      clearInterval(intervalId);
      link.href = imageUrl;
    };
  }, [imageUrl, speedMs]);
}
