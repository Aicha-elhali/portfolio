/**
 * SkillsGrid Component
 * Modernes Logo-Grid mit Hover-Effekten
 * Author: Aicha El Hali
 */

"use client";

import styles from "./SkillsGrid.module.css";
import { useState } from "react";

// Skills with their icon source. Most use the simple-icons CDN, but Adobe removed
// its brand icons from simple-icons, so Illustrator/Photoshop are served locally
// (matching the project pages). HTML/CSS are covered by React, so they're omitted.
const skills = [
  // Design Tools
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Illustrator", icon: "/icons/illustrator.svg" },
  { name: "Photoshop", icon: "/icons/photoshop.svg" },

  // Development
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const renderSkill = (skill: { name: string; icon: string }) => (
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
          src={skill.icon}
          alt={skill.name}
          className={styles.icon}
          loading="lazy"
          width={48}
          height={48}
        />
      </div>
      <span className={styles.skillName}>{skill.name}</span>
    </div>
  );

  // First seven on the top row; Node.js, Python and Git together underneath.
  const topRow = skills.slice(0, 7);
  const bottomRow = skills.slice(7);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>{topRow.map(renderSkill)}</div>
      <div className={styles.grid}>{bottomRow.map(renderSkill)}</div>

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
