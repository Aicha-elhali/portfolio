/**
 * WaveName Component
 * Buchstaben animieren in einer Helligkeits-Welle
 * Author: Aicha El Hali
 */

"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./WaveName.module.css";

interface WaveNameProps {
  line1: string;
  line2: string;
}

export default function WaveName({ line1, line2 }: WaveNameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Split text into individual characters with unique indices
  const letters1 = useMemo(() => line1.split(""), [line1]);
  const letters2 = useMemo(() => line2.split(""), [line2]);

  // Total letters for wave calculation
  const totalLine1 = letters1.length;

  return (
    <h1 className={`${styles.name} ${isLoaded ? styles.visible : ""}`}>
      <span className={styles.line}>
        {letters1.map((char, i) => (
          <span
            key={`l1-${i}`}
            className={`${styles.letter} ${char === " " ? styles.space : ""}`}
            style={{
              "--wave-index": i,
              "--wave-total": totalLine1 + letters2.length,
            } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
      <span className={styles.line}>
        {letters2.map((char, i) => (
          <span
            key={`l2-${i}`}
            className={`${styles.letter} ${char === " " ? styles.space : ""}`}
            style={{
              "--wave-index": totalLine1 + i,
              "--wave-total": totalLine1 + letters2.length,
            } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </h1>
  );
}