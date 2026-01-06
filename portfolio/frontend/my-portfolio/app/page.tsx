/**
 * Portfolio Homepage
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import SiteHeader from "./components/SiteHeader";
import BackgroundStrokes from "./components/BackgroundStrokes";
import Footer from "./components/Footer";
import SkillRating from "./components/SkillRating";

// Skills Daten - vorbereitet für späteres Backend
const skillsData = [
  { id: 1, name: "FIGMA DESIGN-TOOL", rating: 5 },
  { id: 2, name: "PYTHON", rating: 4 },
  { id: 3, name: "PHOTOSHOP & ILLUSTRATOR", rating: 4 },
  { id: 4, name: "REACT", rating: 3.5 },
];

// Projekte Daten - vorbereitet für späteres Backend
const projects = [
  { id: "01", name: "HARIBO", tags: ["BRANDING", "REDESIGN"], year: "2025", image: "/images/haribo.jpg" },
  { id: "02", name: "StyleMate", tags: ["UI/UX", "CHATBOT"], year: "2024", image: "/images/stylemate.jpg" },
  { id: "03", name: "Spacey", tags: ["PRODUCT", "UI"], year: "2025", image: "/images/spacey.jpg" },
  { id: "04", name: "Moosburg", tags: ["PROTOTYPE", "RESEARCH"], year: "2025", image: "/images/moosburg.jpg" },
  { id: "05", name: "Hangman", tags: ["REACT", "GAME"], year: "2025", image: "/images/hangman.jpg" },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState({ line1: "AICHA", line2: "EL HALI" });
  const [isLoaded, setIsLoaded] = useState(false);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const scrambleText = useCallback((targetText: string, onComplete: (text: string) => void) => {
    let iteration = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iteration > index * 0.8) return char;
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");
      
      onComplete(scrambled);
      iteration += 1;
      
      if (iteration > targetText.length + maxIterations) {
        clearInterval(interval);
        onComplete(targetText);
      }
    }, 40);
    
    return interval;
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hoveredProject) {
      const project = projects.find(p => p.id === hoveredProject);
      if (project) {
        const nameParts = project.name.toUpperCase().split(" ");
        const line1Target = nameParts[0] || "";
        const line2Target = nameParts.slice(1).join(" ") || "";
        
        const interval1 = scrambleText(line1Target, (text) => setDisplayName(prev => ({ ...prev, line1: text })));
        const interval2 = scrambleText(line2Target, (text) => setDisplayName(prev => ({ ...prev, line2: text })));
        
        return () => {
          clearInterval(interval1);
          clearInterval(interval2);
        };
      }
    } else {
      const interval1 = scrambleText("AICHA", (text) => setDisplayName(prev => ({ ...prev, line1: text })));
      const interval2 = scrambleText("EL HALI", (text) => setDisplayName(prev => ({ ...prev, line2: text })));
      
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }
  }, [hoveredProject, scrambleText]);

  return (
    <div className={styles.page}>
      {/* Background Strokes Komponente */}
      <BackgroundStrokes />

      {/* Header Komponente */}
      <SiteHeader />

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {/* Decorative Element */}
            <div className={styles.heroDecor}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorText}>PORTFOLIO 2025</span>
            </div>

            {/* Main Name */}
            <h1 className={`${styles.name} ${isLoaded ? styles.nameVisible : ''}`}>
              <span className={styles.nameLine} style={{ animationDelay: '0.1s' }}>
                {displayName.line1}
              </span>
              <span className={styles.nameLine} style={{ animationDelay: '0.2s' }}>
                {displayName.line2}
              </span>
            </h1>

            {/* Tagline */}
            <p className={`${styles.tagline} ${isLoaded ? styles.taglineVisible : ''}`}>
              Designer & Developer creating thoughtful digital experiences
            </p>

            {/* Hero Info */}
            <div className={styles.heroInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>BASED IN</span>
                <span className={styles.infoValue}>MUNICH, DE</span>
              </div>
              <div className={styles.infoDivider}></div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>LOCAL TIME</span>
                <span className={styles.infoValue}>{currentTime}</span>
              </div>
              <div className={styles.infoDivider}></div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>STATUS</span>
                <span className={styles.infoValueHighlight}>
                  <span className={styles.statusDot}></span>
                  AVAILABLE
                </span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
              <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
              <div className={styles.scrollLine}>
                <div className={styles.scrollDot}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className={styles.projectsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>FEATURED WORK</span>
            <h2 className={styles.sectionTitle}>Selected Projects</h2>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <Link 
                href={`/projects/${project.name.toLowerCase().replace(' ', '-')}`} 
                key={project.id} 
                className={`${styles.projectCard} ${hoveredProject === project.id ? styles.active : ''} ${hoveredProject && hoveredProject !== project.id ? styles.blurred : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.projectImageWrapper}>
                  <div 
                    className={styles.projectImage}
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className={styles.projectOverlay}>
                    <span className={styles.viewProject}>
                      <span>VIEW</span>
                      <span className={styles.viewArrow}>→</span>
                    </span>
                  </div>
                  <div className={styles.projectIndex}>{project.id}</div>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className={styles.viewAllWrapper}>
            <Link href="/projects" className={styles.viewAllLink}>
              <span>VIEW ALL PROJECTS</span>
              <span className={styles.viewAllArrow}>→</span>
            </Link>
          </div>
        </section>

        {/* Skills Section */}
        <section className={styles.skillsSection}>
          <div className={styles.skillsHeader}>
            <span className={styles.sectionLabel}>EXPERTISE</span>
            <h2 className={styles.sectionTitle}>Skills & Tools</h2>
            <p className={styles.skillsText}>
              Combining programming skills with design tools to build simple, thoughtful digital experiences.
            </p>
          </div>

          <div className={styles.skillsGrid}>
            {skillsData.map((skill, index) => (
              <div 
                key={skill.id} 
                className={styles.skillCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillIndex}>0{skill.id}</span>
                  <SkillRating rating={skill.rating} />
                </div>
                <span className={styles.skillName}>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Let's work together</h2>
            <p className={styles.ctaText}>
              Have a project in mind? I'd love to hear about it.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              <span>GET IN TOUCH</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Komponente */}
      <Footer />
    </div>
  );
}