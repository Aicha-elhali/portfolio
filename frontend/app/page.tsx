/**
 * Portfolio Homepage - V4 Poster Style
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import SiteHeader from "./components/SiteHeader";
import BackgroundStrokes from "./components/BackgroundStrokes";
import Footer from "./components/Footer";
import WaveName from "./components/WaveName";
import SkillsGrid from "./components/SkillsGrid";


// ===========================================
// DATA
// ===========================================

const projects = [
  { id: "01", slug: "social-media-agents", name: "Social Media Agents", tags: ["AGENTS", "N8N"], year: "2025", image: "/images/projects/atoll_landing.jpg" },
  { id: "02", slug: "moosburg", name: "Moosburg", tags: ["CONCEPT", "RESEARCH"], year: "2025", image: "/images/projects/landing_moosburg.jpg" },
  { id: "03", slug: "flight-footprint", name: "Flight Footprint", tags: ["DATA VIZ", "INFO DESIGN"], year: "2025", image: "/images/projects/flight_poster.jpg" },
];

// ===========================================
// CUSTOM HOOK: Scroll Reveal
// ===========================================

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// ===========================================
// COMPONENT
// ===========================================

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState({ line1: "AICHA", line2: "EL HALI" });
  const [isLoaded, setIsLoaded] = useState(false);

  const currentlyRef = useInView<HTMLDivElement>();
  const projectsHeader = useInView<HTMLDivElement>();
  const projectsGrid = useInView<HTMLDivElement>();
  const skillsHeader = useInView<HTMLDivElement>();

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
      <BackgroundStrokes />
      <SiteHeader />

      <main className={styles.main}>
        {/* ============== HERO - POSTER STYLE ============== */}
        <section className={styles.hero}>
          <div className={styles.heroTopBar}>
            <div className={styles.heroDecor}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorText}>PORTFOLIO · 2026</span>
            </div>
            <div className={styles.heroTopRight}>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                AVAILABLE
              </span>
            </div>
          </div>
            <div className={`${styles.heroMain} ${isLoaded ? styles.heroMainVisible : ''}`}>
            <WaveName line1={displayName.line1} line2={displayName.line2} />
            <div className={`${styles.heroDescription} ${isLoaded ? styles.descriptionVisible : ''}`}>
              <span className={styles.heroRole}>CS &amp; DESIGN · 4th Semester · HM </span>
              <p className={styles.tagline}>
              I think in systems, design in pixels, and build in code.
              Once a problem pulls me in,{" "}
              <span className={styles.taglineAccent}>I don&apos;t let go</span>. 
              I dig deeper until the interface feels right and the
              experience just works.
              </p>
            </div>
            </div>

          <div className={styles.heroBottomBar}>
            <div className={styles.heroBottomLeft}>
              <span className={styles.metaItem}>MUNICH, GER</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaItem} suppressHydrationWarning>
                {currentTime || "--:--:--"}
              </span>
            </div>
            <div className={styles.heroBottomRight}>
              <div className={styles.scrollHint}>
                <span className={styles.scrollHintText}>SCROLL</span>
                <span className={styles.scrollHintArrow}>↓</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============== CURRENTLY (BMW) ============== */}
        <section 
          ref={currentlyRef.ref}
          className={`${styles.currentlySection} ${currentlyRef.isInView ? styles.inView : ''}`}
        >
          <div className={styles.currentlyLabel}>
            <span className={styles.liveDot}></span>
            CURRENT PROJECT
          </div>

          <div className={styles.currentlyGrid}>
            <div className={styles.currentlyLeft}>
              <h2 className={styles.currentlyTitle}>
              FLUID<br />PROTOTYPING
              </h2>
              <p className={styles.currentlyDescription}>
              Building fast, interactive prototyping workflows for automotive user experiences, allowing designers to test and iterate in-car screens without any coding knowledge.
              </p>
              <div className={styles.currentlyMeta}>
              <span className={styles.currentlyRole}>Designer &amp; Developer</span>
              <span className={styles.phaseBadge}>
                <span className={styles.phaseDot}></span>
                In Progress
              </span>
              </div>
            </div>

            <div className={styles.currentlyRight}>
              <div className={styles.currentlyImageWrapper}>
                <Image
                src="/images/fluid-prototyping.jpg"
                alt="Fluid Prototyping - BMW Project"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.currentlyImage}
                style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============== PROJECTS ============== */}
        <section className={styles.projectsSection}>
          <div 
            ref={projectsHeader.ref}
            className={`${styles.sectionHeader} ${projectsHeader.isInView ? styles.inView : ''}`}
          >
            <span className={`${styles.sectionLabel} ${styles.projectsEyebrow}`}>
              RECENT WORK 
            </span>
            <h2 className={styles.projectsTitle}>
              <span className={styles.projectsTitleStrong}>Work I&apos;ve</span>
              <span className={styles.projectsTitleSoft}>been building lately.</span>
            </h2>
          </div>

          <div ref={projectsGrid.ref} className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <Link 
                href={`/projects/${project.slug}`}
                key={project.id} 
                className={`
                  ${styles.projectCard} 
                  ${projectsGrid.isInView ? styles.revealed : ''}
                  ${hoveredProject === project.id ? styles.active : ''} 
                  ${hoveredProject && hoveredProject !== project.id ? styles.blurred : ''}
                `}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ transitionDelay: projectsGrid.isInView ? `${index * 80}ms` : '0ms' }}
              >
                <div className={styles.projectImageWrapper}>
                  {(project as any).video ? (
                    <video
                      src={(project as any).video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.projectImage}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
                      className={styles.projectImage}
                      style={{ objectFit: 'cover' }}
                      priority={index < 2}
                    />
                  )}
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

          <div className={styles.viewAllWrapper}>
            <Link href="/projects" className={styles.viewAllLink}>
              <span>VIEW ALL PROJECTS</span>
              <span className={styles.viewAllArrow}>→</span>
            </Link>
          </div>
        </section>

        {/* ============== SKILLS ============== */}
        <section className={styles.skillsSection}>
          <div 
            ref={skillsHeader.ref}
            className={`${styles.skillsHeader} ${skillsHeader.isInView ? styles.inView : ''}`}
          >
            <span className={styles.sectionLabel}>EXPERTISE</span>
            <h2 className={styles.sectionTitle}>Skills &amp; Tools</h2>
            <p className={styles.skillsText}>
              Combining design tools with code to build digital experiences that feel effortless.
            </p>
          </div>

          <SkillsGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}