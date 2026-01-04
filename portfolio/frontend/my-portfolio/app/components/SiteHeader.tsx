"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import headerStyles from "../page.module.css";

export default function SiteHeader() {
  const pathname = usePathname() || "/";

  const isActive = (path: string) => {
    if (path === "/projects") return pathname.startsWith("/projects");
    return pathname === path;
  };

  return (
    <header className={headerStyles.header}>
      <Link href="/" className={headerStyles.logo}>
        AICHA EL HALI
      </Link>
      <nav className={headerStyles.nav}>
        <Link href="/" className={headerStyles.navLink}>
          HOME
        </Link>

        <Link href="/about" className={headerStyles.navLink}>
          {isActive("/about") ? (
            <>
              <span className={headerStyles.bracket}>[</span> ABOUT <span className={headerStyles.bracket}>]</span>
            </>
          ) : (
            "ABOUT"
          )}
        </Link>

        <Link href="/projects" className={headerStyles.navLink}>
          {isActive("/projects") ? (
            <>
              <span className={headerStyles.bracket}>[</span> PROJECTS <span className={headerStyles.bracket}>]</span>
            </>
          ) : (
            "PROJECTS"
          )}
        </Link>
      </nav>
    </header>
  );
}
