/**
 * Footer Component
 * Wiederverwendbarer Footer für alle Seiten
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import Link from "next/link";
import styles from "./Footer.module.css";

// Interface für die Props der Komponente
interface FooterProps {
  showImprint?: boolean;
}

export default function Footer({ showImprint = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>© {currentYear}</span>
      
      {showImprint && (
        <div className={styles.footerLinks}>
          <Link href="/imprint" className={styles.footerLink}>
            IMPRINT & DATA PRIVACY
          </Link>
        </div>
      )}
      
      <span className={styles.credit}>
        DESIGN & DEVELOPMENT BY AICHA EL HALI
      </span>
    </footer>
  );
}