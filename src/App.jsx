import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Apply Theme & Dark mode attribute to HTML root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', 'dark');
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  // Filter projects by category & search query
  const filteredProjects = projectsData.filter((project) => {
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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Balanced Project Showcase Grid */}
          <div style={{
            maxWidth: '1140px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onSelectProject={setSelectedProject}
                  />
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
