/**
 * SiteHeader Component
 * Reusable header with navigation
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";
import { useAuth } from "../contexts/AuthContext";

// Navigation links, prepared for future backend
const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const { isAuthenticated, user, logout } = useAuth();

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
        
        {/* Auth-Bereich */}
        {isAuthenticated ? (
          <button 
            onClick={logout} 
            className={styles.authButton}
            title={`Logged in as ${user?.name}`}
          >
            LOGOUT
          </button>
        ) : (
          <Link 
            href="/login" 
            className={styles.navLink}
          >
            {isActive("/login") ? (
              <>
                <span className={styles.bracket}>[</span>
                {" LOGIN "}
                <span className={styles.bracket}>]</span>
              </>
            ) : (
              "LOGIN"
            )}
          </Link>
        )}
      </nav>
    </header>
  );
}