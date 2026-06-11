'use client'

/**
 * PrototypeEmbed
 * Wraps a Figma prototype iframe with a themed loading overlay that hides Figma's
 * white loading screen. The overlay is dismissed only once Figma posts a real
 * "ready" message (INITIAL_LOAD / PRESENTED_NODE_CHANGED) — not on iframe onLoad,
 * which fires while Figma is still showing its own white loader. A timeout acts
 * as a safety net so the overlay can never get stuck.
 */

import { useEffect, useState } from 'react'
import styles from './PrototypeEmbed.module.css'

interface PrototypeEmbedProps {
  url: string
  title: string
}

export default function PrototypeEmbed({ url, title }: PrototypeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.origin.includes('figma.com')) return
      const type = event.data?.type
      if (type === 'INITIAL_LOAD' || type === 'PRESENTED_NODE_CHANGED') {
        setLoaded(true)
      }
    }
    window.addEventListener('message', handleMessage)

    // Safety net: never leave the overlay stuck if no message arrives.
    const timeout = window.setTimeout(() => setLoaded(true), 10000)

    return () => {
      window.removeEventListener('message', handleMessage)
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <iframe
        className={styles.frame}
        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`}
        title={title}
        allowFullScreen
      />
      {!loaded && (
        <div className={styles.loading} aria-hidden="true">
          <span className={styles.spinner} />
          <span className={styles.label}>Prototype loading…</span>
        </div>
      )}
    </>
  )
}
