/**
 * SocialLinks Component
 * Reusable social media links
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import styles from "./SocialLinks.module.css";

// Interface for individual social links
interface SocialLink {
  label: string;
  href: string;
  displayText: string;
}

// Interface for component props
interface SocialLinksProps {
  links?: SocialLink[];
  layout?: "vertical" | "horizontal";
  showLabels?: boolean;
}

// Default social links - prepared for future backend
const defaultLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:aicha.el_hali@hm.edu",
    displayText: "AICHA.EL_HALI@HM.EDU"
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