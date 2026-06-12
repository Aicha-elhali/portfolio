'use client'

/**
 * ShowcaseVideo
 * A user-controlled video with a prominent custom play button overlay.
 *
 * On play, the file is fetched in full and played from a local blob URL. This
 * makes scrubbing/seeking work reliably even though Cloudflare Pages doesn't
 * serve HTTP range requests (which otherwise marks the video non-seekable).
 */

import { useEffect, useRef, useState } from 'react'
import styles from './ShowcaseVideo.module.css'

interface ShowcaseVideoProps {
  src: string
  title: string
}

export default function ShowcaseVideo({ src, title }: ShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  // Revoke the object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  // Once the blob is ready, reveal the controls and start playback.
  useEffect(() => {
    if (blobUrl && videoRef.current) {
      setStarted(true)
      videoRef.current.play().catch(() => {})
    }
  }, [blobUrl])

  const handlePlay = async () => {
    if (loading || blobUrl) return
    setLoading(true)
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      setBlobUrl(URL.createObjectURL(blob))
    } catch {
      // Fallback: stream straight from the source (seeking may be limited).
      setStarted(true)
      videoRef.current?.play().catch(() => {})
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={styles.video}
        src={blobUrl ?? src}
        controls={started}
        playsInline
        preload="metadata"
      />
      {!started && (
        <button
          type="button"
          className={styles.playButton}
          onClick={handlePlay}
          disabled={loading}
          aria-label={loading ? `Loading ${title}` : `Play ${title}`}
        >
          {loading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            <span className={styles.playGlyph} aria-hidden="true">
              ▶
            </span>
          )}
        </button>
      )}
    </>
  )
}
