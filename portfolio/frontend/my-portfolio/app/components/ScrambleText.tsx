/**
 * ScrambleText Component
 * Reusable text with scramble animation on load
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

"use client";

import { useState, useEffect } from "react";

// Interface for component props
interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnHover?: boolean;
}

// Constant for scramble characters
const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({ 
  text, 
  className = "", 
  speed = 40,
  triggerOnHover = false
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation beim Laden oder Hover
  useEffect(() => {
    // Wenn triggerOnHover aktiv ist und nicht gehovert wird, nicht animieren
    if (triggerOnHover && !isHovered) {
      setDisplayText(text);
      return;
    }

    // Wenn bereits animiert wurde und nicht hover-basiert, nicht erneut animieren
    if (!triggerOnHover && hasAnimated) {
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iteration > index * 0.8) return char;
          return SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
        })
        .join("");
      
      setDisplayText(scrambled);
      iteration += 1;
      
      if (iteration > text.length + 10) {
        clearInterval(interval);
        setDisplayText(text);
        setHasAnimated(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, triggerOnHover, isHovered, hasAnimated]);

  if (triggerOnHover) {
    return (
      <span 
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayText}
      </span>
    );
  }

  return <span className={className}>{displayText}</span>;
}