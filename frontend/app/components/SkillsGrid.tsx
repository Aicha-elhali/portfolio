/**
 * SkillsGrid Component
 * Modernes Logo-Grid mit Hover-Effekten
 * Author: Aicha El Hali
 */

"use client";

import styles from "./SkillsGrid.module.css";
import { useState } from "react";

// Skills mit ihren simple-icons slugs + original Brand-Farben
// simple-icons CDN: https://cdn.simpleicons.org/[slug]/[color]
const skills = [
  // Design Tools
  { name: "Figma", slug: "figma", color: "F24E1E", category: "design" },
  { name: "Adobe XD", slug: "adobexd", color: "FF61F6", category: "design" },
  { name: "Illustrator", slug: "adobeillustrator", color: "FF9A00", category: "design" },
  { name: "Photoshop", slug: "adobephotoshop", color: "31A8FF", category: "design" },
  
  // Development
  { name: "React", slug: "react", color: "61DAFB", category: "dev" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF", category: "dev" },
  { name: "TypeScript", slug: "typescript", color: "3178C6", category: "dev" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E", category: "dev" },
  { name: "HTML5", slug: "html5", color: "E34F26", category: "dev" },
  { name: "CSS3", slug: "css3", color: "1572B6", category: "dev" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E", category: "dev" },
  { name: "Python", slug: "python", color: "3776AB", category: "dev" },
  { name: "MongoDB", slug: "mongodb", color: "47A248", category: "dev" },
  { name: "Git", slug: "git", color: "F05032", category: "dev" },
];

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`${styles.skillItem} ${
              hoveredSkill && hoveredSkill !== skill.name ? styles.dimmed : ""
            }`}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className={styles.iconWrapper}>
              <img
                src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                alt={skill.name}
                className={styles.icon}
                loading="lazy"
                width={48}
                height={48}
              />
            </div>
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Counter / Info */}
      <div className={styles.skillsFooter}>
        <span className={styles.skillsCount}>
          <span className={styles.countNumber}>{skills.length}</span>
          <span className={styles.countLabel}>Tools & Technologies</span>
        </span>
        <span className={styles.alwaysLearning}>
          <span className={styles.learningDot}></span>
          Always learning
        </span>
      </div>
    </div>
  );
}
