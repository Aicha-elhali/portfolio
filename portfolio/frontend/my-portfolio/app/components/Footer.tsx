/**
 * Footer Component
 * Reusable footer for all pages
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import Link from "next/link";
import styles from "./Footer.module.css";

// Interface for component props
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