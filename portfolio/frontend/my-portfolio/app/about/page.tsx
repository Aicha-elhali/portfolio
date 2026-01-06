/**
 * About Page
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import styles from "./page.module.css";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import BackgroundStrokes from "../components/BackgroundStrokes";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import ScrambleText from "../components/ScrambleText";

export default function About() {
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
          <div className={styles.titleWrapper}>
            <span className={styles.subtitle}>GET TO KNOW ME</span>
            <h1 className={styles.title}>
              <ScrambleText text="ABOUT" />
            </h1>
          </div>
        </section>

        {/* Content Grid */}
        <section className={styles.content}>
          {/* Left Column - Image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageFrame}>
                <img 
                  src="/images/IMG_0668.jpg" 
                  alt="Aicha El Hali" 
                  className={styles.profileImage} 
                />
              </div>
              <div className={styles.imageDecor}></div>
            </div>
            
            {/* Stats under image */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3rd</span>
                <span className={styles.statLabel}>Semester</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>7+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>∞</span>
                <span className={styles.statLabel}>Curiosity</span>
              </div>
            </div>
          </div>

          {/* Right Column - Text & Info */}
          <div className={styles.textColumn}>
            <div className={styles.introText}>
              <p className={styles.highlight}>
                I'm Aicha El Hali — a designer & developer crafting digital experiences at the intersection of aesthetics and functionality.
              </p>
            </div>

            <div className={styles.description}>
              <p>
                Currently in my 3rd semester studying Computer Science and Design, I specialize in UX design and frontend development. Born in Munich with Moroccan roots, I bring a unique perspective to every project.
              </p>
              <p>
                My journey spans tech, law, and insurance industries, giving me broad insight into different business contexts. I believe great design should feel invisible such as intuitive, accessible, and human.
              </p>
            </div>

            {/* Services/Focus Areas */}
            <div className={styles.focusAreas}>
              <h3 className={styles.focusTitle}>FOCUS AREAS</h3>
              <div className={styles.focusTags}>
                <span className={styles.focusTag}>UX Design</span>
                <span className={styles.focusTag}>UI Development</span>
                <span className={styles.focusTag}>Prototyping</span>
                <span className={styles.focusTag}>Brand Identity</span>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.contactSection}>
              <h3 className={styles.contactTitle}>LET'S CONNECT</h3>
              <SocialLinks layout="vertical" showLabels={true} />
              
              {/* CTA Button */}
              <Link href="/contact" className={styles.ctaButton}>
                <span className={styles.ctaText}>START A PROJECT</span>
                <span className={styles.ctaArrow}>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Komponente */}
      <Footer />
    </div>
  );
}