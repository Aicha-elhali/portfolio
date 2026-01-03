"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function About() {
  return (
    <div className={styles.page}>
      {/* Background Strokes */}
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
        <Link href="/" className={styles.logo}>AICHA EL HALI</Link>
        <nav className={styles.nav}>
          <ScrambleLink href="/">HOME</ScrambleLink>
          <ScrambleLink href="/about" hasBrackets>ABOUT</ScrambleLink>
          <ScrambleLink href="/projects">PROJECTS</ScrambleLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>ABOUT</h1>
          
          <div className={styles.description}>
            <p>
              I'm Aicha El Hali, a Computer Science and Design student in my 3rd semester, specializing in UX design and development.
            </p>
            <p>
              Born in Munich with Moroccan roots, I'm passionate about creating intuitive digital experiences that bridge technology and human needs.
            </p>
            <p>
              My journey spans tech, law, and insurance industries, giving me broad insight into different business contexts and experiences.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Image Placeholder */}
          <div className={styles.imageContainer}>
            {/* Add your image here when ready */}
          </div>

          {/* Contact Links */}
          <div className={styles.contactSection}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email ↗</span>
              <a href="mailto:a.elhali03@gmail.com" className={styles.contactLink}>A.ELHALI03@GMAIL.COM</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>LinkedIn ↗</span>
              <a href="https://linkedin.com/in/aicha-elhali" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>/IN/AICHA-ELHALI</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>GitHub ↗</span>
              <a href="https://github.com/aicha-elhali" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>/AICHA-ELHALI</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Instagram ↗</span>
              <a href="https://instagram.com/aicha.elhy" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>@AICHA.ELHY</a>
            </div>
          </div>

          {/* Let's Talk Button */}
          <Link href="/contact" className={styles.letsTalkButton}>
            LET'S TALK
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className={styles.copyright}>© 2026</span>
          <div className={styles.footerLinks}>
            <Link href="/imprint" className={styles.footerLink}>IMPRINT & DATA PRIVACY</Link>
          </div>
        </div>
        <span className={styles.credit}>DESIGN & DEVELOPMENT BY AICHA EL HALI</span>
      </footer>
    </div>
  );
}
