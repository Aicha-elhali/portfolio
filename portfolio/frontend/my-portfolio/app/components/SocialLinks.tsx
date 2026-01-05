/**
 * SocialLinks Component
 * Wiederverwendbare Social Media Links
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import styles from "./SocialLinks.module.css";

// Interface für einzelne Social Links
interface SocialLink {
  label: string;
  href: string;
  displayText: string;
}

// Interface für die Props der Komponente
interface SocialLinksProps {
  links?: SocialLink[];
  layout?: "vertical" | "horizontal";
  showLabels?: boolean;
}

// Standard Social Links - vorbereitet für späteres Backend
const defaultLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:a.elhali03@gmail.com",
    displayText: "A.ELHALI03@GMAIL.COM"
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aicha-elhali",
    displayText: "/IN/AICHA-ELHALI"
  },
  {
    label: "GitHub",
    href: "https://github.com/aicha-elhali",
    displayText: "/AICHA-ELHALI"
  },
  {
    label: "Instagram",
    href: "https://instagram.com/aicha.elhy",
    displayText: "@AICHA.ELHY"
  }
];

export default function SocialLinks({ 
  links = defaultLinks,
  layout = "vertical",
  showLabels = true
}: SocialLinksProps) {
  return (
    <div className={`${styles.socialLinks} ${styles[layout]}`}>
      {links.map((link, index) => (
        <div key={index} className={styles.socialItem}>
          {showLabels && (
            <span className={styles.socialLabel}>{link.label} ↗</span>
          )}
          <a 
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className={styles.socialLink}
          >
            {link.displayText}
          </a>
        </div>
      ))}
    </div>
  );
}