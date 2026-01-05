/**
 * SiteHeader Component
 * Wiederverwendbarer Header mit Navigation
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

// Navigation Links - vorbereitet für späteres Backend
const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";

  // Prüft ob ein Link aktiv ist
  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        AICHA EL HALI
      </Link>
      
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className={styles.navLink}
          >
            {isActive(link.href) ? (
              <>
                <span className={styles.bracket}>[</span>
                {` ${link.label} `}
                <span className={styles.bracket}>]</span>
              </>
            ) : (
              link.label
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}