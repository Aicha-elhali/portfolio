/**
 * ScrambleLink Component
 * Wiederverwendbarer Link mit Text-Scramble-Effekt
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./ScrambleLink.module.css";

// Interface für die Props der Komponente
interface ScrambleLinkProps {
  href: string;
  children: string;
  hasBrackets?: boolean;
  className?: string;
}

// Konstante für die Scramble-Zeichen
const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleLink({ 
  href, 
  children, 
  hasBrackets = false,
  className = ""
}: ScrambleLinkProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(children);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iteration > index * 0.8) return char;
          return SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
        })
        .join("");
      
      setDisplayText(scrambled);
      iteration += 1;
      
      if (iteration > children.length + 10) {
        clearInterval(interval);
        setDisplayText(children);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isHovered, children]);

  return (
    <Link 
      href={href} 
      className={`${styles.link} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasBrackets && <span className={styles.bracket}>[</span>}
      {hasBrackets ? ` ${displayText} ` : displayText}
      {hasBrackets && <span className={styles.bracket}>]</span>}
    </Link>
  );
}