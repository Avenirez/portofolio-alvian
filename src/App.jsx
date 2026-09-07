import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollProgressBar from './components/ScrollProgressBar';
import GlobalBackground from './components/GlobalBackground';
import HeroSection from './components/HeroSection';
import FilterSearch from './components/FilterSearch';
import ProjectCard from './components/ProjectCard';
import TechStack from './components/TechStack';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { projectsData } from './data/projectsData';

// Code-split: the modal (and its focus-trap/iframe logic) is only
// needed once a visitor actually opens a project, so it doesn't need
// to be in the initial bundle.
const ProjectModal = lazy(() => import('./components/ProjectModal'));

// Safe web storage wrapper for Incognito / Sandboxed environments
const safeStorage = {
  get: (type, key, fallback = null) => {
    try {
      const storage = type === 'local' ? window.localStorage : window.sessionStorage;
      return storage ? storage.getItem(key) || fallback : fallback;
    } catch {
      return fallback;
    }
  },
  set: (type, key, val) => {
    try {
      const storage = type === 'local' ? window.localStorage : window.sessionStorage;
      if (storage) storage.setItem(key, val);
    } catch {}
  }
};

export default function App() {
  const [currentTheme, setTheme] = useState(() => {
    return safeStorage.get('local', 'portfolio-theme', 'sunset');
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !safeStorage.get('session', 'portfolio-preloader-seen');
  });
  const [projectsList, setProjectsList] = useState(projectsData);
  const [isAutoPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [isClickPaused, setIsClickPaused] = useState(false);
  const clickPauseTimerRef = React.useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const handlePreloaderComplete = useCallback(() => {
    safeStorage.set('session', 'portfolio-preloader-seen', 'true');
    setIsLoading(false);
  }, []);

  // Temporarily pause auto-slide when a card is clicked/interacted with
  const handleCardInteract = useCallback(() => {
    setIsClickPaused(true);
    if (clickPauseTimerRef.current) {
      clearTimeout(clickPauseTimerRef.current);
    }
    clickPauseTimerRef.current = setTimeout(() => {
      setIsClickPaused(false);
    }, 6000);
  }, []);

  // Apply Theme & Dark mode attribute to HTML root element
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.documentElement.setAttribute('data-mode', 'dark');
    } catch {}
    safeStorage.set('local', 'portfolio-theme', currentTheme);
  }, [currentTheme]);

  // Auto-shift project cards left/right every 3.0 seconds
  useEffect(() => {
    if (!isAutoPlaying || isPausedByHover || isClickPaused || selectedProject || projectsList.length <= 1) return;

    const interval = setInterval(() => {
      setProjectsList((prevList) => {
        if (prevList.length <= 1) return prevList;
        return [...prevList.slice(1), prevList[0]];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPausedByHover, isClickPaused, selectedProject, projectsList.length]);

  // Filter projects by category & search query. Memoized for performance.
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projectsList.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query));
      return matchesSearch;
    });
  }, [projectsList, activeCategory, searchQuery]);

  // Reset filters, close modal, and scroll to top
  const handleGoHome = useCallback(() => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Smooth Auto-Shifting Project Showcase Grid */}
          <div
            onMouseEnter={() => setIsPausedByHover(true)}
            onMouseLeave={() => setIsPausedByHover(false)}
            style={{
              maxWidth: '1140px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px',
              overflowAnchor: 'none'
            }}
          >
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      layout: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.35 }
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onSelectProject={setSelectedProject}
                      onCardInteract={handleCardInteract}
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
        <TechStack />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onGoHome={handleGoHome} />

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectModal
              key="project-modal"
              project={selectedProject}
              onClose={handleCloseModal}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
