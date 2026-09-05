import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/projectsData';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Jika honeypot terisi, itu adalah bot spam otomatis. Simulasikan berhasil tanpa mengirim API request.
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;
    
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/" + personalInfo.socials.email, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName.slice(0, 100),
          email: trimmedEmail.slice(0, 100),
          message: trimmedMessage.slice(0, 1000),
          _subject: `New Portfolio Message from ${trimmedName.slice(0, 50)}`
        })
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontak" style={{
      padding: '100px 24px 80px 24px',
      maxWidth: '1140px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center'
      }} className="contact-grid">

        {/* Left Column: Heading & Social Links */}
        <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            display: 'block',
            marginBottom: '10px'
          }}>
            MULAI DISKUSI
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: '800',
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '24px'
          }}>
            Tertarik Bekerja Sama atau Diskusi Proyek?
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '36px',
            maxWidth: '480px'
          }}>
            Saya selalu terbuka untuk peluang kolaborasi baru, pengembangan aplikasi web interaktif, maupun konsultasi teknis. Tinggalkan pesan Anda pada formulir ini:
          </p>

          {/* Social Icons Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="social-icon-btn">
              <GithubIcon size={18} />
            </a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Glassmorphism Form Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-hover)',
          clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
          padding: '36px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px var(--accent-glow)'
        }}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '40px 20px' }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text-main)' }}>
                Pesan Berhasil Terkirim!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Honeypot field tersembunyi untuk penangkap bot spam */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="bot_check_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  NAMA ANDA
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Masukkan nama Anda..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  ALAMAT EMAIL
                </label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  PESAN ANDA
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Tuliskan pesan atau kebutuhan projek Anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  background: 'var(--accent-gradient)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px var(--accent-glow)',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  opacity: loading ? 0.7 : 1
                }}
              >
                Kirim Pesan
              </button>
            </form>
          )}
        </div>

      </div>

      <style>{`
        .social-icon-btn {
          width: 44px;
          height: 44px;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .social-icon-btn:hover {
          background: var(--accent-light);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-3px);
        }
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
  background: 'rgba(10, 12, 20, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  color: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s ease'
};
