/**
 * BackgroundStrokes Component
 * Wiederverwendbarer animierter Linien-Hintergrund
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import styles from "./BackgroundStrokes.module.css";

// Interface für die Props der Komponente
interface BackgroundStrokesProps {
  columnCount?: number;
}

export default function BackgroundStrokes({ 
  columnCount = 5 
}: BackgroundStrokesProps) {
  return (
    <div className={styles.backgroundStrokes}>
      {[...Array(columnCount)].map((_, i) => (
        <div key={i} className={styles.column}>
          <div className={styles.lineLeft}></div>
          <div className={styles.lineMiddleLeft}></div>
          <div className={styles.lineMiddleRight}></div>
          <div className={styles.lineRight}></div>
        </div>
      ))}
    </div>
  );
}