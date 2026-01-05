/**
 * SkillRating Component
 * Wiederverwendbare Skill-Bewertung mit Punkten (1-5)
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import styles from "./SkillRating.module.css";

// Interface für die Props der Komponente
interface SkillRatingProps {
  rating: number;      // 1-5, unterstützt halbe Punkte (z.B. 3.5)
  maxRating?: number;  // Standard: 5
  size?: "small" | "medium" | "large";
}

export default function SkillRating({ 
  rating, 
  maxRating = 5,
  size = "medium"
}: SkillRatingProps) {
  const dots = [];
  
  for (let i = 1; i <= maxRating; i++) {
    let dotClass = styles.dot;
    
    if (i <= Math.floor(rating)) {
      // Voller Punkt
      dotClass = `${styles.dot} ${styles.dotFilled}`;
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // Halber Punkt
      dotClass = `${styles.dot} ${styles.dotHalf}`;
    }
    
    dots.push(
      <span 
        key={i} 
        className={`${dotClass} ${styles[size]}`}
      />
    );
  }
  
  return <div className={styles.skillRating}>{dots}</div>;
}