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
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>
            <ScrambleText text="ABOUT" />
          </h1>
          
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
          {/* Profile Image */}
          <div className={styles.imageContainer}>
            <img 
              src="/images/IMG_0668.jpg" 
              alt="Aicha El Hali" 
              className={styles.profileImage} 
            />
          </div>

          {/* Social Links Komponente */}
          <div className={styles.contactSection}>
            <SocialLinks layout="vertical" showLabels={true} />
          </div>

          {/* Let's Talk Button */}
          <Link href="/contact" className={styles.letsTalkButton}>
            LET'S TALK
          </Link>
        </div>
      </main>

      {/* Footer Komponente */}
      <Footer />
    </div>
  );
}