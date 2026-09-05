import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Trophy, Timer, Sparkles, Gamepad2 } from 'lucide-react';

const TECH_ITEMS = [
  { id: 'react', name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { id: 'nextjs', name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { id: 'supabase', name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { id: 'typescript', name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { id: 'vite', name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { id: 'nodejs', name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { id: 'astro', name: 'Astro', icon: 'https://cdn.simpleicons.org/astro/FF5D01' }
];

function generateDeck() {
  const deck = [];
  TECH_ITEMS.forEach((tech) => {
    deck.push({ ...tech, instanceId: `${tech.id}-1` });
    deck.push({ ...tech, instanceId: `${tech.id}-2` });
  });

  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck.map((card, index) => ({
    ...card,
    index,
    isFlipped: false,
    isMatched: false
  }));
}

export default function TechMemoryGame({ isOpen, onClose }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [bestMoves, setBestMoves] = useState(() => {
    return parseInt(localStorage.getItem('tech-game-best-moves') || '0', 10);
  });

  // Initialize Game
  const resetGame = () => {
    setCards(generateDeck());
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(false);
    setIsWon(false);
    setIsChecking(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isPlaying && !isWon && isOpen) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon, isOpen]);

  // Handle Card Click
  const handleCardClick = (clickedIndex) => {
    if (isChecking || cards[clickedIndex].isFlipped || cards[clickedIndex].isMatched) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }

    // Flip the clicked card
    const updatedCards = cards.map((card, i) =>
      i === clickedIndex ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedIndex];
    setFlippedCards(newFlipped);

    // If two cards are flipped
    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = updatedCards[firstIdx];
      const secondCard = updatedCards[secondIdx];

      if (firstCard.id === secondCard.id) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);

          // Check Win Condition
          const matchedCount = updatedCards.filter((c) => c.isMatched || c.id === firstCard.id).length;
          if (matchedCount === updatedCards.length) {
            setIsWon(true);
            setIsPlaying(false);
            const currentMoves = moves + 1;
            if (!bestMoves || currentMoves < bestMoves) {
              setBestMoves(currentMoves);
              localStorage.setItem('tech-game-best-moves', currentMoves.toString());
            }
          }
        }, 400);
      } else {
        // Not a match: flip back after delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 900);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6, 8, 16, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 35px var(--accent-glow)',
          zIndex: 10001,
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Gamepad2 size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Tech Match Arcade
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Cocokkan pasangan logo teknologi!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <div style={statBoxStyle}>
            <Timer size={16} color="var(--accent-primary)" />
            <div>
              <span style={statLabelStyle}>WAKTU</span>
              <div style={statValueStyle}>{formatTime(timer)}</div>
            </div>
          </div>

          <div style={statBoxStyle}>
            <RotateCcw size={16} color="var(--accent-primary)" />
            <div>
              <span style={statLabelStyle}>LANGKAH</span>
              <div style={statValueStyle}>{moves}</div>
            </div>
          </div>

          <div style={statBoxStyle}>
            <Trophy size={16} color="var(--accent-primary)" />
            <div>
              <span style={statLabelStyle}>TERBAIK</span>
              <div style={statValueStyle}>{bestMoves ? `${bestMoves} moves` : '-'}</div>
            </div>
          </div>
        </div>

        {/* Victory Screen Overlay */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              style={{
                textAlign: 'center',
                padding: '24px 16px',
                background: 'var(--accent-light)',
                border: '1px solid var(--accent-glow)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', background: 'var(--accent-gradient)', color: '#fff', marginBottom: '10px' }}>
                <Sparkles size={28} />
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
                Selamat! Anda Menang! 🎉
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Selesai dalam <strong>{moves} langkah</strong> ({formatTime(timer)}).
              </p>
              <button
                onClick={resetGame}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.85rem', margin: '0 auto' }}
              >
                <RotateCcw size={16} /> Main Lagi
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4x4 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          {cards.map((card, index) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <motion.div
                key={card.instanceId}
                whileHover={{ scale: isRevealed ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(index)}
                style={{
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  cursor: isRevealed ? 'default' : 'pointer',
                  perspective: 1000,
                  position: 'relative'
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isRevealed ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Back (Hidden State) */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    <span style={{ fontSize: '1.2rem', opacity: 0.3, fontWeight: '800', fontFamily: 'Space Grotesk' }}>
                      ?
                    </span>
                  </div>

                  {/* Card Front (Revealed State) */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: 'var(--radius-md)',
                    background: card.isMatched ? 'var(--accent-light)' : 'var(--bg-secondary)',
                    border: card.isMatched ? '1px solid var(--accent-primary)' : '1px solid var(--border-hover)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: card.isMatched ? '0 0 15px var(--accent-glow)' : '0 4px 12px rgba(0,0,0,0.4)'
                  }}>
                    <img
                      src={card.icon}
                      alt={card.name}
                      style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                    />
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-main)', textAlign: 'center', lineHeight: 1 }}>
                      {card.name}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid var(--border-color)'
        }}>
          <button
            onClick={resetGame}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={14} /> Acak & Ulangi Game
          </button>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            8 Pasang Logo Teknologi
          </span>
        </div>

      </motion.div>
    </div>
  );
}

const statBoxStyle = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  padding: '10px 12px',
  borderRadius: 'var(--radius-sm)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const statLabelStyle = {
  fontSize: '0.65rem',
  fontWeight: '800',
  letterSpacing: '0.05em',
  color: 'var(--text-dim)',
  display: 'block'
};

const statValueStyle = {
  fontSize: '0.95rem',
  fontWeight: '800',
  color: 'var(--text-main)',
  fontFamily: 'Space Grotesk, monospace'
};
