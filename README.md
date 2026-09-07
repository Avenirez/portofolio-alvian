# Web Portfolio — Alvian Ariadi

> Platform portofolio web modern, interaktif, dan berperforma tinggi yang dibangun menggunakan **React 19**, **Vite**, **Framer Motion**, dan **Tailwind/Vanilla CSS**. Dirancang dengan estetika *Cosmic Glassmorphism*, animasi fisika 3D, dan integrasi *real-time live screenshot pipeline*.

---

## Ringkasan Proyek

Dokumen ini berisi dokumentasi teknis untuk **Web Portfolio Alvian Ariadi** (Fullstack Web Engineer). Portofolio ini mengintegrasikan berbagai proyek unggulan di bidang **Fullstack Development**, **Geographic Information System (GIS)**, serta **E-Commerce Systems**.

---

## Fitur-Fitur Utama

### 1. Latar Belakang & Efek Visual Cosmic
- **Canvas Interaktif Multi-Layer**: Menggabungkan matriks titik-titik (*dot grid matrix*), *glowing orbs* yang responsif terhadap tema, partikel debu bintang (*stardust*), dan tekstur *film grain*.
- **Objek Luar Angkasa 3D**: Visualisasi galaksi spiral yang berputar, planet Saturnus dengan cincin, singularitas *black hole*, komet, serta simbol-simbol luar angkasa.
- **Interaksi Kursor & Laser Tether**: Jalur kardust partikel putih yang mengikuti pergerakan kursor mouse, efek *laser cursor tether*, gelombang *ping radar satellite*, dan ledakan *supernova* saat klik.

### 2. Real-Time Live Project Screenshots
- **Pipeline Multi-Provider**: Menggunakan screenshot langsung dari website yang telah dideploy secara *real-time* via **Thum.io Chrome Headless Engine** & **WordPress mshots**.
- **Mekanisme Fallback Otomatis**: Transisi mulus ke format gambar **WebP lokal** beresolusi tinggi apabila terjadi kendala jaringan pada penyedia screenshot eksternal.

### 3. Kartu Proyek Interaktif 3D & Carousel
- **Fisika Kartu 3D**: Efek rotasi 3D saat diklik (*3D Spin Rotation*), efek kedalaman lapisan parallax (*Parallax Layer Depth*), dan kilauan kaca (*Glass Glare Shimmer Sweep*).
- **Slider Otomatis 60 FPS**: Penggeser kartu otomatis yang halus tanpa hambatan interaksi manual.
- **Modal Detail Proyek**: Tampilan modal yang komprehensif menyajikan deskripsi lengkap, tantangan teknis, fitur utama, dan daftar teknologi.

### 4. Fitur Pendukung & Optimasi Performa
- **Animasi Typewriter Berurutan**: Efek pengetikan dinamis untuk nama dan peran teknis (*Fullstack Web Engineer*).
- **Papan HUD Sci-Fi & Jendela Kode Mac Terminal**: Tata letak bento grid dengan bingkai HUD futuristik.
- **SafeStorage Wrapper**: Lapisan pelindung penyimpanan `localStorage` & `sessionStorage` untuk mencegah insiden *DOMException crash* pada mode *Incognito/Private Browser*.
- **Optimasi Performa & Keamanan**: Dukungan *Lazy Loading*, pembersihan *linter warnings* via **Oxlint**, header keamanan HTTP, dan perlindungan *honeypot anti-spam* pada formulir kontak.

---

## Teknologi yang Digunakan

### Core Stack
* **Framework Frontend**: [React 19](https://react.dev/)
* **Build Tool & Bundler**: [Vite 8](https://vitejs.dev/)
* **Engine Animasi**: [Framer Motion 13](https://framer.com/motion) & CSS Keyframes Custom
* **Ikonografi**: [Lucide React](https://lucide.dev/)
* **Linter & Code Quality**: [Oxlint](https://oxc.rs/)

### Layanan & API Eksternal
* **Live Web Screenshots**: Thum.io Headless Rendering & WordPress mshots API
* **Penyimpanan Lokal**: Browser LocalStorage dengan SafeStorage Engine
* **Deployment**: [Vercel](https://vercel.com/)

---

## Struktur Direktori Proyek

```text
web-portfolio/
├── public/                  # Asset statis, favicon, logo QRIS, dan gambar WebP proyek
├── src/
│   ├── assets/              # Gambar dan asset vektor tambahan
│   ├── components/          # Komponen UI modular (Hero, ProjectCard, Navbar, Preloader, dll.)
│   ├── data/                # Data konfigurasi informasi personal dan proyek (projectsData.js)
│   ├── App.jsx              # Komponen utama aplikasi
│   ├── App.css              # Styling khusus aplikasi
│   ├── index.css            # Desain sistem global dan token CSS
│   └── main.jsx             # Entry point React DOM
├── scripts/                 # Script pembantu (sync-vercel.js)
├── .oxlintrc.json           # Konfigurasi Oxlint
├── package.json             # Manifes proyek & dependensi
└── vite.config.js           # Konfigurasi Vite
```

---

## Tautan Terkait

* **Live Portfolio Website**: [https://alviandev.my.id](https://alviandev.my.id)
* **GitHub Profile**: [https://github.com/Avenirez](https://github.com/Avenirez)
* **LinkedIn Profile**: [https://www.linkedin.com/in/alvianariadi/](https://www.linkedin.com/in/alvianariadi/)

---

## Lisensi

Proyek ini dibuat dan dikembangkan oleh **Alvian Ariadi**. Bebas digunakan sebagai referensi pengembang web lainnya dengan tetap mencantumkan atribusi.
