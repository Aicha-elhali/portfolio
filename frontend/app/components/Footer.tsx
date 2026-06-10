/**
 * Footer Component - Combined CTA + Marquee + Info
 * Author: Aicha El Hali
 */

"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* ============== CTA ============== */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaGrid}>
          <div className={styles.ctaLeft}>
            <h2 className={styles.ctaTitle}>
              LET&apos;S WORK<br />TOGETHER.
            </h2>
            <p className={styles.ctaText}>
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </div>

          <div className={styles.ctaRight}>
            <div className={styles.ctaLinks}>
              <a 
                href="mailto:aicha.el_hali@hm.edu" 
                className={styles.ctaLink}
              >
                <span className={styles.ctaLinkLabel}>EMAIL</span>
                <span className={styles.ctaLinkValue}>
                  aicha.el_hali@hm.edu
                  <span className={styles.ctaLinkArrow}>→</span>
                </span>
              </a>

              <a 
                href="https://github.com/aichaelhali" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.ctaLink}
              >
                <span className={styles.ctaLinkLabel}>GITHUB</span>
                <span className={styles.ctaLinkValue}>
                  @aichaelhali
                  <span className={styles.ctaLinkArrow}>→</span>
                </span>
              </a>

              <Link href="/contact" className={styles.ctaLink}>
                <span className={styles.ctaLinkLabel}>CONTACT</span>
                <span className={styles.ctaLinkValue}>
                  Send a message
                  <span className={styles.ctaLinkArrow}>→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============== MARQUEE ============== */}
      <div className={styles.marquee} aria-label="Personal motto">
        <div className={styles.marqueeTrack}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.marqueeContent}>
              <span className={styles.marqueeText}>Fall in love with the problem</span>
              <span className={styles.marqueeStar}>✦</span>
              <span className={styles.marqueeTextMuted}>not the solution</span>
              <span className={styles.marqueeStar}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============== BOTTOM BAR ============== */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          © {currentYear} Aicha El Hali
        </span>
        <span className={styles.madeIn}>
          Made in München 🥨
        </span>
      </div>
    </footer>
  );
}