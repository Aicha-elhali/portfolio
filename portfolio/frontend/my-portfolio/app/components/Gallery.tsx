/**
 * 3D Card Carousel Gallery
 * Converted from Svelte to React
 * Author: Aicha El Hali
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Gallery.module.css";

interface GallerySlide {
  type: "video" | "image";
  src: string;
  caption: string;
  location: string;
}

const slides: GallerySlide[] = [
  {
    type: "video",
    src: "/images/trips/robot.mp4",
    caption: "The future is already here",
    location: "Shanghai",
  },
  {
    type: "image",
    src: "/images/trips/shopping.jpg",
    caption: "Learning beyond borders",
    location: "Shanghai",
  },
  {
    type: "image",
    src: "/images/trips/london.jpg",
    caption: "Where I found my pace",
    location: "London",
  },
  {
    type: "image",
    src: "/images/trips/morocco.jpg",
    caption: "My roots, my perspective",
    location: "Morocco",
  },
  {
    type: "image",
    src: "/images/trips/munich.jpg",
    caption: "Home base. Always.",
    location: "München",
  },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef(0);

  const total = slides.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : total - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c < total - 1 ? c + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  // Play/pause videos
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === current) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [current]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  // 3D card positioning
  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - current;
    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        opacity: 0,
        transform: `translateX(${diff * 400}px) rotateY(${diff * -25}deg) scale(0.6)`,
        zIndex: 0,
        pointerEvents: "none",
      };
    }

    const translateX = diff * 280;
    const rotateY = diff * -18;
    const translateZ = -absDiff * 100;
    const scale = 1 - absDiff * 0.12;
    const zIndex = 10 - absDiff;
    const opacity = absDiff === 0 ? 1 : 0.5;
    const brightness = absDiff === 0 ? 1 : 0.4;

    return {
      opacity,
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      pointerEvents: absDiff === 0 ? "auto" : "none",
      filter: `brightness(${brightness})`,
    };
  };

  return (
    <div className={styles.carousel}>
      {/* Track */}
      <div
        className={styles.track}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.card} ${i === current ? styles.cardActive : ""}`}
            style={getCardStyle(i)}
            onClick={() => setCurrent(i)}
          >
            <div className={styles.cardInner}>
              {slide.type === "video" ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={slide.src}
                  loop
                  muted
                  playsInline
                  className={styles.cardMedia}
                />
              ) : (
                <img
                  src={slide.src}
                  alt={`${slide.caption} - ${slide.location}`}
                  className={styles.cardMedia}
                  loading="lazy"
                />
              )}
              {i === current && (
                <div className={styles.cardCaption}>
                  <p className={styles.captionText}>{slide.caption}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className={styles.arrowLeft} onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className={styles.arrowRight} onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Footer: dots + location */}
      <div className={styles.footer}>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className={styles.location}>
          <span className={styles.locationLabel}>CURRENTLY VIEWING</span>
          <span className={styles.locationName}>{slides[current].location}</span>
        </div>
      </div>
    </div>
  );
}