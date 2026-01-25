/**
 * SkillRating Component
 * Reusable skill rating with dots (1-5)
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import styles from "./SkillRating.module.css";

// Interface for component props
interface SkillRatingProps {
  rating: number;      // 1-5, supports half points (e.g. 3.5)
  maxRating?: number;  // Default: 5
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
      // Full dot
      dotClass = `${styles.dot} ${styles.dotFilled}`;
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // Half dot
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