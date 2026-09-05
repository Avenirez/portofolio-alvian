import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveProjectShowcase() {
  const [activeTab, setActiveTab] = useState('lexaa');

  // Lexaa Store State
  const [qrisPaid, setQrisPaid] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');

  // Kizu Topup State
  const [selectedGame, setSelectedGame] = useState('MLBB');
  const [playerId, setPlayerId] = useState('');
  const [topupSuccess, setTopupSuccess] = useState(false);

  // JakScope GIS State
  const [filters, setFilters] = useState({ hospital: true, school: true, transport: true });

  // SkyFlow Weather State
  const [city, setCity] = useState('Jakarta');

  // TaskFlow Kanban State
  const [taskStatus, setTaskStatus] = useState('Todo');

  const handleLexaaPay = () => {
    setQrisPaid(true);
    const key = 'LXA-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2026';
    setLicenseKey(key);
  };

  const handleTopup = (e) => {
    e.preventDefault();
    if (!playerId) return;
    setTopupSuccess(true);
    setTimeout(() => setTopupSuccess(false), 4000);
  };

  const weatherData = {
    Jakarta: { temp: '32°C', status: 'Cerah Berawan ☀️', humidity: '72%' },
    Surabaya: { temp: '34°C', status: 'Panas Terik 🌞', humidity: '65%' },
    Bali: { temp: '29°C', status: 'Hujan Ringan 🌧️', humidity: '80%' },
    Tokyo: { temp: '18°C', status: 'Sejuk Berawan ☁️', humidity: '55%' }
  };

  return (
    <section id="interaktif" style={{ padding: '60px 24px', position: 'relative' }}>
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px var(--accent-glow)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            background: 'var(--accent-light)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            display: 'inline-block',
            marginBottom: '8px'
          }}>
            [INTERACTIVE_PROJECT_PLAYGROUND // RUNNING]
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
            Uji Coba Fitur Interaktif Projek
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Simulasi langsung fitur utama dari projek-projek yang telah saya kembangkan. Klik tab di bawah untuk mencoba interaksinya!
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '28px'
        }}>
          {[
            { id: 'lexaa', label: 'Lexaa Store — Toko Digital' },
            { id: 'kizu', label: 'Kizu Topup — Game Store' },
            { id: 'jakscope', label: 'JakScope — GIS Peta Jakarta' },
            { id: 'skyflow', label: 'SkyFlow — Weather Radar' },
            { id: 'taskflow', label: 'TaskFlow — Work Tracker' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isActive ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Playground */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          minHeight: '220px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AnimatePresence mode="wait">

            {/* TAB 1: LEXAA STORE */}
            {activeTab === 'lexaa' && (
              <motion.div
                key="lexaa"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ width: '100%', maxWidth: '650px', textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
                  Simulasi Pembayaran QRIS Instan (Lexaa Store)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                  Setiap transaksi pada Lexaa Store memproses kode lisensi secara otomatis 24/7.
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'var(--bg-card)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <button
                    onClick={handleLexaaPay}
                    style={{
                      background: 'var(--accent-gradient)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '10px 24px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px var(--accent-glow)'
                    }}
                  >
                    Simulasi Scan & Bayar QRIS (Rp 49.000)
                  </button>

                  {qrisPaid && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        padding: '12px 18px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid #10b981',
                        borderRadius: 'var(--radius-sm)',
                        color: '#10b981',
                        fontSize: '0.88rem',
                        fontWeight: '700'
                      }}
                    >
                      ✅ Pembayaran Berhasil! Lisensi Produk Diterbitkan: <code style={{ color: '#ffffff', background: '#000', padding: '2px 6px', borderRadius: '4px' }}>{licenseKey}</code>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 2: KIZU TOPUP */}
            {activeTab === 'kizu' && (
              <motion.div
                key="kizu"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ width: '100%', maxWidth: '650px' }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)', textAlign: 'center' }}>
                  Kalkulator & Simulator Top Up Diamond (Kizu Topup)
                </h3>

                <form onSubmit={handleTopup} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: 'var(--bg-card)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['MLBB', 'Valorant', 'Genshin'].map((game) => (
                      <button
                        type="button"
                        key={game}
                        onClick={() => setSelectedGame(game)}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: 'var(--radius-sm)',
                          border: selectedGame === game ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                          background: selectedGame === game ? 'var(--accent-light)' : 'transparent',
                          color: selectedGame === game ? 'var(--accent-primary)' : 'var(--text-muted)',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        {game}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Masukkan ID Game (Contoh: 12345678)"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      background: 'var(--accent-gradient)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Kirim Top Up {selectedGame}
                  </button>

                  {topupSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '700', textAlign: 'center' }}
                    >
                      🚀 Top Up {selectedGame} Berhasil Dikirim ke User ID {playerId}!
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}

            {/* TAB 3: JAKSCOPE GIS */}
            {activeTab === 'jakscope' && (
              <motion.div
                key="jakscope"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ width: '100%', maxWidth: '650px', textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
                  Filter Layer Peta Fasilitas Publik (JakScope GIS)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Aktifkan / nonaktifkan layer GIS di bawah untuk melihat simulasi pin fasilitas DKI Jakarta:
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                  {Object.keys(filters).map((key) => (
                    <label key={key} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      background: 'var(--bg-card)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)'
                    }}>
                      <input
                        type="checkbox"
                        checked={filters[key]}
                        onChange={() => setFilters((prev) => ({ ...prev, [key]: !prev[key] }))}
                      />
                      {key.toUpperCase()}
                    </label>
                  ))}
                </div>

                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  fontSize: '0.88rem',
                  fontWeight: '700'
                }}>
                  <span>🏥 Rumah Sakit: {filters.hospital ? '24 Pin Aktif 🟢' : 'Nonaktif ⚪'}</span>
                  <span>🏫 Sekolah: {filters.school ? '48 Pin Aktif 🟢' : 'Nonaktif ⚪'}</span>
                  <span>🚌 Halte / MRT: {filters.transport ? '36 Pin Aktif 🟢' : 'Nonaktif ⚪'}</span>
                </div>
              </motion.div>
            )}

            {/* TAB 4: SKYFLOW WEATHER */}
            {activeTab === 'skyflow' && (
              <motion.div
                key="skyflow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ width: '100%', maxWidth: '650px', textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
                  Prakiraan Cuaca Kota Interaktif (SkyFlow)
                </h3>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                  {Object.keys(weatherData).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: 'var(--radius-full)',
                        border: city === c ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: city === c ? 'var(--accent-gradient)' : 'transparent',
                        color: city === c ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div style={{
                  background: 'var(--bg-card)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-primary)' }}>
                    {weatherData[city].temp}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '4px' }}>
                    {weatherData[city].status}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Kelembaban Udara: {weatherData[city].humidity}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: TASKFLOW */}
            {activeTab === 'taskflow' && (
              <motion.div
                key="taskflow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ width: '100%', maxWidth: '650px', textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
                  Workflow Status Tugas (TaskFlow)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Klik tombol status di bawah untuk mengubah status pengerjaan fitur:
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
                  {['Todo', 'In Progress', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setTaskStatus(st)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: 'var(--radius-sm)',
                        border: taskStatus === st ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: taskStatus === st ? 'var(--accent-gradient)' : 'transparent',
                        color: taskStatus === st ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div style={{
                  background: 'var(--bg-card)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Status Aktif: <span style={{ color: 'var(--accent-primary)' }}>{taskStatus}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {taskStatus === 'Todo' && '⏳ Tugas siap dikerjakan oleh tim pengembang.'}
                    {taskStatus === 'In Progress' && '⚡ Fitur sedang dalam tahap coding & integrasi API.'}
                    {taskStatus === 'Completed' && '✓ Fitur telah selesai diuji dan divalidasi!'}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
