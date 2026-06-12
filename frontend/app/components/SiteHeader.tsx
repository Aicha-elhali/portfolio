/**
 * SiteHeader Component
 * Reusable header with navigation
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

// Navigation links, prepared for future backend
const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

interface SiteHeaderProps {
  // When true (light hero), use dark header text until scrolled past the hero.
  darkOverHero?: boolean;
}

export default function SiteHeader({ darkOverHero = false }: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const [overHero, setOverHero] = useState(darkOverHero);

  useEffect(() => {
    if (!darkOverHero) return;
    const onScroll = () => {
      // Dark while the (full-screen) hero still sits behind the header.
      setOverHero(window.scrollY < window.innerHeight - 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [darkOverHero]);

  // Prüft ob ein Link aktiv ist
  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className={`${styles.header} ${overHero ? styles.dark : ""}`}>
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