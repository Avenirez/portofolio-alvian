import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import CursorGlow from './components/CursorGlow';
import ScrollProgressBar from './components/ScrollProgressBar';
import GlobalBackground from './components/GlobalBackground';
import HeroSection from './components/HeroSection';
import FilterSearch from './components/FilterSearch';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import TechStack from './components/TechStack';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { projectsData } from './data/projectsData';

export default function App() {
  const [currentTheme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'sunset';
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('portfolio-preloader-seen');
  });
  const [projectsList, setProjectsList] = useState(projectsData);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('portfolio-preloader-seen', 'true');
    setIsLoading(false);
  };

  // Apply Theme & Dark mode attribute to HTML root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', 'dark');
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  // Auto-shift project cards left/right every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || isPausedByHover || projectsList.length <= 1) return;

    const interval = setInterval(() => {
      setProjectsList((prevList) => {
        if (prevList.length <= 1) return prevList;
        return [...prevList.slice(1), prevList[0]];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPausedByHover, projectsList.length]);

  const handleNextShift = () => {
    setProjectsList((prevList) => {
      if (prevList.length <= 1) return prevList;
      return [...prevList.slice(1), prevList[0]];
    });
  };

  const handlePrevShift = () => {
    setProjectsList((prevList) => {
      if (prevList.length <= 1) return prevList;
      return [prevList[prevList.length - 1], ...prevList.slice(0, prevList.length - 1)];
    });
  };

  // Filter projects by category & search query
  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Reset filters, close modal, and scroll to top
  const handleGoHome = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Initial Cyber Preloader Screen */}
      <AnimatePresence>
        {isLoading && (
          <Preloader key="initial-preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Global Multi-Layered Background System */}
      <GlobalBackground />

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Dynamic Cursor Glow Spotlight */}
      <CursorGlow />

      {/* Responsive Navigation Header */}
      <Navbar
        currentTheme={currentTheme}
        setTheme={setTheme}
        onGoHome={handleGoHome}
      />

      {/* Main Content */}
      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <HeroSection />

        {/* Projects Showcase Section */}
        <section id="projek" style={{ padding: '80px 24px 60px 24px' }}>
          <FilterSearch
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Header Controls for Auto-Shift Slider */}
          <div style={{
            maxWidth: '1140px',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isAutoPlaying && !isPausedByHover ? 'var(--accent-primary)' : '#6b7280',
                boxShadow: isAutoPlaying && !isPausedByHover ? '0 0 10px var(--accent-glow)' : 'none',
                display: 'inline-block'
              }} />
              <span>{isPausedByHover ? 'Auto-Slide Terhenti (Hover)' : isAutoPlaying ? 'Bergeser Otomatis Secara Berkala' : 'Auto-Slide Nonaktif'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? "Jeda Auto-Slide" : "Jalankan Auto-Slide"}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isAutoPlaying ? 'Jeda' : 'Putar'}</span>
              </button>

              <button
                onClick={handlePrevShift}
                title="Geser Ke Kiri"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNextShift}
                title="Geser Ke Kanan"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Smooth Auto-Shifting Project Showcase Grid */}
          <div
            onMouseEnter={() => setIsPausedByHover(true)}
            onMouseLeave={() => setIsPausedByHover(false)}
            style={{
              maxWidth: '1140px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      onSelectProject={setSelectedProject}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: 'var(--text-muted)'
                  }} className="glass-card">
                  <h3>Tidak ada projek yang cocok</h3>
                  <p style={{ marginTop: '8px' }}>Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Tech Stack Section */}

        {/* Tech Stack Section */}
        <TechStack />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onGoHome={handleGoHome} />

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key="project-modal"
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
