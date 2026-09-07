export const personalInfo = {
  name: "Alvian Ariadi",
  role: "Fullstack Web Engineer",
  tagline: "Membangun Aplikasi Web Modern, Interaktif, dan Berperforma Tinggi",
  bio: "Saya adalah seorang mahasiswa yang mempunyai hobi belajar hal baru khususnya di bidang IT. Selain itu, saya juga berdedikasi dalam membuat website dengan memanfaatkan teknologi AI untuk mengoptimalkan pekerjaan.",
  location: "DKI Jakarta, Indonesia",
  focus: "Focus: Fullstack Development, Geographic Information System & E-Commerce Systems",
  availableForWork: true,
  stats: {
    projectsCompleted: 7,
    satisfiedClients: 12,
    yearsExperience: "3+",
    technologiesMastered: 10
  },
  socials: {
    github: "https://github.com/Avenirez",
    linkedin: "https://www.linkedin.com/in/alvianariadi/",
    twitter: "https://twitter.com",
    email: "alvianariadiii@gmail.com",
    website: "https://alviandev.my.id"
  }
};

export const categories = [
  { id: "all", label: "Semua Projek" },
  { id: "frontend", label: "Frontend & Web App" },
  { id: "fullstack", label: "Fullstack & Geographic Information System" },
  { id: "ecommerce", label: "E-Commerce" }
];

export const projectsData = [
  {
    "id": 7,
    "title": "Kizu Topup — Platform Top-Up Game Online",
    "category": "ecommerce",
    "categoryLabel": "E-Commerce",
    "description": "Platform e-commerce top-up game online murah, terpercaya & instan dengan integrasi pembayaran QRIS, promo flash sale, dan fitur lacak pesanan.",
    "fullDescription": "Kizu Topup adalah platform web e-commerce top-up game online 24/7. Menyediakan transaksi instan untuk 10+ game populer (Mobile Legends, Free Fire, Genshin Impact, PUBG Mobile, Valorant, HSR), fitur flash sale diskon otomatis, integrasi QRIS & E-Wallet, serta halaman lacak status transaksi.",
    "image": "/projects/kizutopup.webp",
    "demoUrl": "https://kizutopup.vercel.app/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "Astro (Frontend)",
      "Node.js Serverless (Backend)",
      "QRIS Payment Gateway (API)",
      "WhatsApp CS (API)",
      "TailwindCSS"
    ],
    "featured": true,
    "keyFeatures": [
      "Katalog Top Up instan untuk 10+ game populer (MLBB, FF, Genshin, Valorant, PUBG)",
      "Sistem Flash Sale & Kode Promo diskon otomatis saat checkout",
      "Halaman Cek Transaksi mandiri untuk memantau status pesanan",
      "Integrasi WhatsApp CS & Pembayaran QRIS / E-Wallet instan 24/7",
      "Tampilan UI/UX modern dengan filter pencarian game & responsif"
    ],
    "challenges": "Merancang antarmuka checkout instan yang responsif serta integrasi sistem pembayaran QRIS yang cepat."
  },
  {
    "id": 1,
    "title": "JakScope — Peta Fasilitas Publik Jakarta",
    "category": "fullstack",
    "categoryLabel": "Fullstack & Geographic Information System",
    "description": "Peta interaktif berbasis data OpenStreetMap (OSM) untuk memantau sebaran fasilitas publik riil di seluruh kelurahan DKI Jakarta secara real-time.",
    "fullDescription": "JakScope adalah platform pemetaan digital interaktif yang menyajikan data sebaran fasilitas sosial & publik seperti sekolah, puskesmas/klinik, taman hijau, hingga pos keamanan di seluruh kelurahan DKI Jakarta. Pengguna cukup mengklik wilayah kelurahan untuk melihat statistik dan lokasi fasilitas publik secara langsung.",
    "image": "/projects/jakscope.webp",
    "demoUrl": "https://jakscope.vercel.app/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "Next.js App Router (Fullstack)",
      "React (Frontend)",
      "Node.js Serverless (Backend)",
      "OpenStreetMap (API)",
      "GeoJSON Jakarta (Database)",
      "Leaflet GL"
    ],
    "featured": true,
    "keyFeatures": [
      "Interaksi klik peta wilayah kelurahan real-time",
      "Filter kategori fasilitas (Kesehatan, Pendidikan, Taman, Keamanan)",
      "Integrasi API data terbuka OpenStreetMap (OSM)",
      "Visualisasi kartu metrik fasilitas dengan efek glassmorphism",
      "Performa render cepat dengan Next.js App Router"
    ],
    "challenges": "Mengolah dan menavigasi ribuan node koordinat fasilitas publik dari OpenStreetMap secara responsif di browser tanpa menyebabkan penurunan FPS."
  },
  {
    "id": 2,
    "title": "Lexaa Store — Toko Akun Digital Premium",
    "category": "ecommerce",
    "categoryLabel": "E-Commerce",
    "description": "Toko e-commerce akun digital premium dengan pengiriman instan otomatis 24/7, integrasi pembayaran QRIS, dan fitur lacak pesanan.",
    "fullDescription": "Lexaa Store adalah platform e-commerce yang menyediakan pembelian akun digital premium. Dilengkapi sistem checkout otomatis 24 jam non-stop, pengiriman detail akun instan setelah pembayaran QRIS, serta halaman lacak pesanan berbasis invoice.",
    "image": "/projects/lexaastore.webp",
    "demoUrl": "https://lexaastore.cloud/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "Astro (Frontend)",
      "React (UI Components)",
      "Node.js Serverless (Backend)",
      "QRIS Payment Gateway (API)",
      "JSON-LD Structured Data (Database/SEO)"
    ],
    "featured": true,
    "keyFeatures": [
      "Pengiriman detail akun otomatis 24/7 setelah verifikasi bayar",
      "Integrasi Gateway Pembayaran QRIS serba otomatis",
      "Sistem timer promo diskon terbatas dengan animasi mundur",
      "Halaman Lacak Pesanan mandiri menggunakan nomor invoice",
      "Optimasi SEO & JSON-LD Structured Data untuk Google & AI Search"
    ],
    "challenges": "Memastikan proses enkripsi dan validasi pembayaran QRIS berjalan aman serta otomatis menampilkan lisensi akun di layar invoice pengguna."
  },
  {
    "id": 5,
    "title": "SkyFlow — Prakiraan Cuaca Interaktif",
    "category": "frontend",
    "categoryLabel": "Frontend & Web App",
    "description": "Aplikasi cuaca modern dengan visualisasi dinamis, peta temperatur geografis Leaflet, dan indeks kualitas cuaca real-time.",
    "fullDescription": "SkyFlow adalah aplikasi prakiraan cuaca interaktif berbasis Svelte yang menampilkan informasi suhu, kelembapan, kecepatan angin, hingga indeks UV di berbagai kota di dunia. Menggunakan Leaflet.js untuk menyajikan lokasi cuaca di atas peta interaktif.",
    "image": "/projects/skyflow.webp",
    "demoUrl": "https://avenirez-weather.vercel.app/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "Svelte & Vite (Frontend)",
      "OpenWeatherMap (API)",
      "Geocoding Service (API)",
      "Leaflet Geolocation (Database/Maps)",
      "CSS Animations"
    ],
    "featured": false,
    "keyFeatures": [
      "Pencarian kondisi cuaca kota-kota di seluruh dunia",
      "Visualisasi peta interaktif lokasi dengan Leaflet.js",
      "Indikator indeks UV, kelembapan, dan kecepatan angin",
      "Background gradien dinamis yang menyesuaikan kondisi cuaca",
      "Performa ringan dan responsif dengan framework Svelte"
    ],
    "challenges": "Mengintegrasikan Leaflet map dengan siklus hidup komponen Svelte agar marker cuaca berpindah mulus ketika nama kota dicari."
  },
  {
    "id": 4,
    "title": "Fintrack — Platform Pengelola Keuangan",
    "category": "frontend",
    "categoryLabel": "Frontend & Web App",
    "description": "Aplikasi pengelolaan keuangan pribadi interaktif untuk mencatat arus kas, pengeluaran bulanan, dan visualisasi grafik anggaran.",
    "fullDescription": "Fintrack membantu pengguna mengontrol keuangan pribadi dengan lebih bijak. Dilengkapi ringkasan saldo, statistik grafik pemasukan vs pengeluaran, kategorisasi transaksi, serta pembuatan batas anggaran bulanan.",
    "image": "/projects/fintrack.webp",
    "demoUrl": "https://avenirez-fintrack.vercel.app/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "React & Vite (Frontend)",
      "Chart.js Engine (Visualization)",
      "Financial Calculation (Backend Logic)",
      "LocalStorage Persistence (Database/Storage)",
      "TailwindCSS"
    ],
    "featured": false,
    "keyFeatures": [
      "Visualisasi grafik arus kas bulanan interaktif",
      "Pencatatan transaksi cepat dengan kategori khusus",
      "Kalkulasi total saldo & pengeluaran otomatis",
      "Desain antarmuka Dark Mode yang nyaman di mata",
      "Penyimpanan data lokal yang aman tanpa perlu login"
    ],
    "challenges": "Merancang logika kalkulasi saldo dan statistik grafik agar secara langsung memperbarui persentase anggaran saat transaksi baru ditambahkan."
  },
  {
    "id": 3,
    "title": "Pentaflix — Platform Penjelajah Film",
    "category": "frontend",
    "categoryLabel": "Frontend & Web App",
    "description": "Platform penjelajah film modern dengan trailer player interaktif, jajaran trending, filter genre, dan simpan ke watchlist.",
    "fullDescription": "Pentaflix menghadirkan pengalaman menjelajahi katalog film kelas dunia. Pengguna dapat menonton trailer HD secara langsung, melihat jajaran film trending & top-rated, memfilter genre favorit, serta menyimpan film ke dalam daftar tontonan (watchlist).",
    "image": "/projects/pentaflix.webp",
    "demoUrl": "https://avenirez-pentaflix.vercel.app/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "Next.js & React (Frontend)",
      "Node.js API Proxy (Backend)",
      "TMDB REST API (API)",
      "LocalStorage Watchlist (Database/Storage)",
      "Framer Motion"
    ],
    "featured": false,
    "keyFeatures": [
      "Hero slider film featured dengan pemutar trailer video instan",
      "Integrasi TMDB API untuk data film, rating, dan sinopsis terbaru",
      "Fitur Watchlist tersinkronisasi dengan LocalStorage",
      "Mode gelap & terang bawaan (Dark/Light Mode)",
      "Pencarian kata kunci judul film, aktor, dan sutradara"
    ],
    "challenges": "Menangani fetching data asynchronous dari TMDB API secara smooth dengan skeleton loading indicator saat pengguna berpindah antar halaman."
  },
  {
    "id": 6,
    "title": "TaskFlow (Tugasku) — Platform Pengelola Tugas",
    "category": "frontend",
    "categoryLabel": "Frontend & Web App",
    "description": "Aplikasi manajemen tugas produktivitas dengan statistik progres, skala prioritas warna, kategori tugas, dan pencarian instan.",
    "fullDescription": "TaskFlow (Tugasku) adalah web app pengelola tugas harian yang dilengkapi indikator persentase progres tugas, pemilahan tingkat prioritas (Tinggi, Sedang, Rendah), tenggat waktu, dan filter status tugas (Semua, Aktif, Selesai).",
    "image": "/projects/taskflow.webp",
    "demoUrl": "https://avenirez-taskflow.vercel.app/",
    "githubUrl": "https://github.com/Avenirez",
    "technologies": [
      "HTML5 & JS ES6+ (Frontend)",
      "Event Engine (Backend Logic)",
      "LocalStorage Persistence (Database/Storage)",
      "CSS3 Glassmorphism"
    ],
    "featured": false,
    "keyFeatures": [
      "Progress bar indikator penyelesaian tugas real-time",
      "Pengelompokan tugas berdasarkan prioritas & kategori",
      "Pencarian kata kunci tugas dengan filter tab slider",
      "Tampilan Glassmorphism modern dengan efek glow orb",
      "Penyimpanan otomatis tugas di LocalStorage"
    ],
    "challenges": "Membuat komponen tab slider indikator dan animasi penyelesaian tugas menggunakan murni Vanilla JavaScript & CSS Variables."
  }
];

export const techSkills = [
  { name: "React, Next.js, Svelte & Astro", level: 95, category: "Frontend" },
  { name: "Node.js, Serverless Functions & Express", level: 90, category: "Backend" },
  { name: "LocalStorage, GeoJSON & Supabase Database", level: 90, category: "Database & Storage" },
  { name: "REST APIs, OpenStreetMap, TMDB & Weather", level: 92, category: "API Integration" },
  { name: "QRIS Payment Gateway & E-Commerce Systems", level: 88, category: "Payment & E-Commerce" },
  { name: "TailwindCSS, Glassmorphism & Modern CSS", level: 95, category: "Styling & UI" },
  { name: "Git, Vercel & Cloud Deployment", level: 90, category: "DevOps & Cloud" }
];
