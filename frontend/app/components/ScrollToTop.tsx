"use client";

/**
 * ScrollToTop
 * Snaps to the top of the page on every route change (and first mount), so
 * navigating to a page always starts at the beginning instead of restoring the
 * previous scroll position. Resets the Lenis smooth-scroll instance too.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
