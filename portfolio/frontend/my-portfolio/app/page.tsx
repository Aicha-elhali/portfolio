/**
 * Portfolio Homepage
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

// NavLink component with scramble effect
function ScrambleLink({ href, children, hasBrackets = false }: { href: string; children: string; hasBrackets?: boolean }) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(children);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iteration > index * 0.8) return char;
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");
      
      setDisplayText(scrambled);
      iteration += 1;
      
      if (iteration > children.length + 10) {
        clearInterval(interval);
        setDisplayText(children);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isHovered, children]);

  return (
    <Link 
      href={href} 
      className={styles.navLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasBrackets && <span className={styles.bracket}>[</span>}
      {hasBrackets ? ` ${displayText} ` : displayText}
      {hasBrackets && <span className={styles.bracket}>]</span>}
    </Link>
  );
}

// SkillRating Komponente für das Punkte-System
interface SkillRatingProps {
  rating: number; // 1-5, unterstützt halbe Punkte (z.B. 3.5)
  maxRating?: number;
}

function SkillRating({ rating, maxRating = 5 }: SkillRatingProps) {
  const dots = [];
  
  for (let i = 1; i <= maxRating; i++) {
    let dotClass = styles.dot;
    
    if (i <= Math.floor(rating)) {
      // Voller Punkt
      dotClass = `${styles.dot} ${styles.dotFilled}`;
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // Halber Punkt
      dotClass = `${styles.dot} ${styles.dotHalf}`;
    }
    
    dots.push(<span key={i} className={dotClass}></span>);
  }
  
  return <div className={styles.skillRating}>{dots}</div>;
}

// Skills Daten - vorbereitet für späteres Backend
const skillsData = [
  { id: 1, name: "FIGMA DESIGN-TOOL", rating: 5 },
  { id: 2, name: "PYTHON", rating: 4 },
  { id: 3, name: "PHOTOSHOP & ILLUSTRATOR", rating: 4 },
  { id: 4, name: "REACT", rating: 3.5 },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState({ line1: "AICHA", line2: "EL HALI" });
  const [isAnimating, setIsAnimating] = useState(false);

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
        setIsAnimating(true);
        const nameParts = project.name.toUpperCase().split(" ");
        const line1Target = nameParts[0] || "";
        const line2Target = nameParts.slice(1).join(" ") || "";
        
        const interval1 = scrambleText(line1Target, (text) => setDisplayName(prev => ({ ...prev, line1: text })));
        const interval2 = scrambleText(line2Target, (text) => setDisplayName(prev => ({ ...prev, line2: text })));
        
        setTimeout(() => setIsAnimating(false), 600);
        
        return () => {
          clearInterval(interval1);
          clearInterval(interval2);
        };
      }
    } else {
      setIsAnimating(true);
      const interval1 = scrambleText("AICHA", (text) => setDisplayName(prev => ({ ...prev, line1: text })));
      const interval2 = scrambleText("EL HALI", (text) => setDisplayName(prev => ({ ...prev, line2: text })));
      
      setTimeout(() => setIsAnimating(false), 600);
      
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }
  }, [hoveredProject, scrambleText]);

  // Projekte Daten - vorbereitet für späteres Backend
  const projects = [
    { id: "01", name: "Project One", tags: ["BRANDING", "DESIGN", "DEVELOPMENT"], year: "2024", image: "/images/project1.jpg" },
    { id: "02", name: "Project Two", tags: ["UI/UX", "DESIGN"], year: "2024", image: "/images/project2.jpg" },
    { id: "03", name: "Project Three", tags: ["DEVELOPMENT", "REACT"], year: "2023", image: "/images/project3.jpg" },
    { id: "04", name: "Project Four", tags: ["BRANDING", "IDENTITY"], year: "2023", image: "/images/project4.jpg" },
    { id: "05", name: "Project Five", tags: ["WEB", "DESIGN"], year: "2024", image: "/images/project5.jpg" },
  ];

  return (
    <div className={styles.page}>
      {/* Background Strokes - 4 lines per image: left, middle-left, middle-right, right */}
      <div className={styles.backgroundStrokes}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.column}>
            <div className={styles.lineLeft}></div>
            <div className={styles.lineMiddleLeft}></div>
            <div className={styles.lineMiddleRight}></div>
            <div className={styles.lineRight}></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>AICHA EL HALI</div>
        <nav className={styles.nav}>
          <ScrambleLink href="/" hasBrackets>HOME</ScrambleLink>
          <ScrambleLink href="/about">ABOUT</ScrambleLink>
          <ScrambleLink href="/projects">PROJECTS</ScrambleLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Name Section */}
        <section className={styles.hero}>
          <h1 className={styles.name}>
            <span className={styles.nameLine}>
              {displayName.line1}
            </span>
            <br />
            <span className={styles.nameLine}>
              {displayName.line2}
            </span>
          </h1>
          <div className={styles.heroInfo}>
            <div className={styles.infoItem}>
              {hoveredProject ? (
                projects.find(p => p.id === hoveredProject)?.tags.map((tag, i) => (
                  <span key={i} className={styles.infoLabel}>{tag}</span>
                ))
              ) : (
                <>
                  <span className={styles.infoLabelBright}>DESIGNER &</span>
                  <span className={styles.infoLabelBright}>DEVELOPER</span>
                </>
              )}
            </div>
            <div className={styles.infoItem}>
              {hoveredProject ? (
                <span className={styles.infoLabel}>{projects.find(p => p.id === hoveredProject)?.year}</span>
              ) : (
                <>
                  <span className={styles.infoLabelBright}>MUNICH, DE</span>
                  <span className={styles.infoTime}>{currentTime}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className={`${styles.projects} ${hoveredProject ? styles.hasHover : ''}`}>
          {projects.map((project) => (
            <Link 
              href={`/work/${project.id}`} 
              key={project.id} 
              className={`${styles.projectCard} ${hoveredProject === project.id ? styles.active : ''} ${hoveredProject && hoveredProject !== project.id ? styles.blurred : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className={styles.projectImage}>
                <div className={styles.projectOverlay}>
                  <span className={styles.projectName}>{project.name}</span>
                </div>
              </div>
              <div className={styles.projectMeta}>
                <span className={styles.projectId}>[{project.id}]</span>
                {hoveredProject === project.id && (
                  <span className={styles.viewProject}>VIEW PROJECT →</span>
                )}
              </div>
            </Link>
          ))}
        </section>

        {/* Skills Section - unter den Projekten */}
        <section className={styles.skillsSection}>
          <div className={styles.skillsIntro}>
            <p className={styles.skillsText}>
              Combining programming skills with Figma design tools, I build simple, thoughtful digital experiences.
            </p>
          </div>
          <div className={styles.skillsList}>
            {skillsData.map((skill) => (
              <div key={skill.id} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                <SkillRating rating={skill.rating} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}