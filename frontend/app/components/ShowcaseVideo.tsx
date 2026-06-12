'use client'

/**
 * ShowcaseVideo
 * A user-controlled video with a prominent custom play button overlay. Before the
 * first play, only the big button shows; once playing, native controls take over.
 */

import { useRef, useState } from 'react'
import styles from './ShowcaseVideo.module.css'

interface ShowcaseVideoProps {
  src: string
  title: string
}

export default function ShowcaseVideo({ src, title }: ShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setStarted(true)
  }

  return (
    <>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button
          type="button"
          className={styles.playButton}
          onClick={handlePlay}
          aria-label={`Play ${title}`}
        >
          <span className={styles.playGlyph} aria-hidden="true">
            ▶
          </span>
        </button>
      )}
    </>
  )
}
