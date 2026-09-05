import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';

export default function ProjectPlayground() {
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0].id);
  const selectedProject = projectsData.find((p) => p.id === activeProjectId) || projectsData[0];

  // Interactive Widget States for Projects
  // 1. Fintrack Calculator State
  const [income, setIncome] = useState(5000000);
  const [expense, setExpense] = useState(1800000);

  // 2. Kizu Topup / Lexaa Store Flash Sale Calculator
  const [itemPrice, setItemPrice] = useState(15000);
  const [discountPercent, setDiscountPercent] = useState(20);

  // 3. TaskFlow Status Switcher
  const [taskStatus, setTaskStatus] = useState('In Progress');

  return (
    <section style={{
      padding: '60px 24px',
      maxWidth: '1140px',
      margin: '0 auto',
      width: '100%'
    }}>
      <div className="hud-container" style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-hover)',
        padding: '32px 28px',
        position: 'relative'
      }}>
        <span className="hud-corner hud-tl" />
        <span className="hud-corner hud-tr" />
        <span className="hud-corner hud-bl" />
        <span className="hud-corner hud-br" />

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="hud-label">[INTERACTIVE_PROJECT_PLAYGROUND // RUNNING]</span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '6px', color: 'var(--text-main)' }}>
            Uji Coba Fitur Interaktif Projek
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '6px', maxWidth: '560px', marginInline: 'auto' }}>
            Simulasi langsung fitur utama dari projek-projek yang telah saya kembangkan. Klik tab di bawah untuk mencoba interaksinya!
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '28px'
        }}>
          {projectsData.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                style={{
                  background: isActive ? 'var(--accent-gradient)' : 'var(--bg-input)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  padding: '8px 16px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 15px var(--accent-glow)' : 'none'
                }}
              >
                {project.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Simulator Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'rgba(8, 10, 18, 0.85)',
              border: '1px solid var(--border-hover)',
              padding: '24px',
              clipPath: 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }} className="playground-grid">
              
              {/* Left Column: Project Info & Live Demo Button */}
              <div>
                <span style={{
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '10px'
                }}>
                  {selectedProject.categoryLabel}
                </span>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
                  {selectedProject.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {selectedProject.description}
                </p>

                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer"
                  style={{ padding: '10px 22px', fontSize: '0.85rem' }}
                >
                  Buka Full Live Demo
                </a>
              </div>

              {/* Right Column: Live Interactive Widget */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '20px',
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-primary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  SIMULASI FITUR LANGSUNG
                </div>

                {/* Widget Variation based on Project */}
                {selectedProject.id === 'fintrack' ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Pemasukan Bulanan (IDR):</label>
                    <input
                      type="range"
                      min="1000000"
                      max="20000000"
                      step="500000"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '12px', accentColor: 'var(--accent-primary)' }}
                    />
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Pengeluaran (IDR):</label>
                    <input
                      type="range"
                      min="500000"
                      max="15000000"
                      step="500000"
                      value={expense}
                      onChange={(e) => setExpense(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '16px', accentColor: 'var(--accent-secondary)' }}
                    />
                    <div style={{ background: 'var(--bg-input)', padding: '12px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <div>Sisa Saldo: <strong style={{ color: 'var(--accent-primary)' }}>Rp {(income - expense).toLocaleString('id-ID')}</strong></div>
                      <div>Tabungan Ratio: <strong>{Math.max(0, Math.round(((income - expense) / income) * 100))}%</strong></div>
                    </div>
                  </div>
                ) : selectedProject.id === 'kizu-topup' || selectedProject.id === 'lexaa-store' ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Harga Item (IDR): Rp {itemPrice.toLocaleString('id-ID')}</label>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '12px', accentColor: 'var(--accent-primary)' }}
                    />
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Diskon Promo Flash Sale: {discountPercent}%</label>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '16px', accentColor: 'var(--accent-primary)' }}
                    />
                    <div style={{ background: 'var(--bg-input)', padding: '12px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <div>Harga Setelah Diskon: <strong style={{ color: '#10b981' }}>Rp {Math.round(itemPrice * (1 - discountPercent / 100)).toLocaleString('id-ID')}</strong></div>
                      <div>Hemat: <strong>Rp {Math.round(itemPrice * (discountPercent / 100)).toLocaleString('id-ID')}</strong></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Status Workflow Tugas:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      {['Todo', 'In Progress', 'Completed'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setTaskStatus(st)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            background: taskStatus === st ? 'var(--accent-primary)' : 'var(--bg-input)',
                            color: taskStatus === st ? '#fff' : 'var(--text-muted)',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                    <div style={{ background: 'var(--bg-input)', padding: '12px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <div>Status Aktif: <strong style={{ color: 'var(--accent-primary)' }}>{taskStatus}</strong></div>
                      <div style={{ marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {taskStatus === 'Completed' ? '✔ Fitur telah selesai diuji dan divalidasi!' : '⚙ Fitur sedang diproses dalam simulasi pipeline.'}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .playground-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
