'use client'

/**
 * ScrollToTop
 * Forces the window to the top whenever the path changes (or on first mount),
 * so revisiting a project page always starts from the beginning instead of
 * restoring the previous scroll position.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Disable the browser's automatic scroll restoration for this view.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
