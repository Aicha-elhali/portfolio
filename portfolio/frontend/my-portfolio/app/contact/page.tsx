"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

// NavLink component with scramble effect
function ScrambleLink({ href, children, hasBrackets = false }: { href: string; children: string; hasBrackets?: boolean }) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
          return characters[Math.floor(Math.random() * characters.length)];
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
      className={styles.navLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasBrackets && <span className={styles.bracket}>[</span>}
      {hasBrackets ? ` ${displayText} ` : displayText}
      {hasBrackets && <span className={styles.bracket}>]</span>}
    </Link>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: ""
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className={styles.page}>
      {/* Background Strokes */}
      <div className={styles.backgroundStrokes}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.column}>
            <div className={styles.lineLeft}></div>
            <div className={styles.lineMiddleLeft}></div>
            <div className={styles.lineMiddleRight}></div>
            <div className={styles.lineRight}></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>AICHA EL HALI</Link>
        <nav className={styles.nav}>
          <ScrambleLink href="/">HOME</ScrambleLink>
          <ScrambleLink href="/about">ABOUT</ScrambleLink>
          <ScrambleLink href="/projects">PROJECTS</ScrambleLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>LET'S TALK</h1>
          
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <p>Thank you for your message!</p>
              <p>I'll get back to you as soon as possible.</p>
              <button 
                className={styles.resetButton}
                onClick={() => setIsSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>NAME *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  placeholder="Your name"
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>EMAIL *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  placeholder="your@email.com"
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>MESSAGE *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                  placeholder="Tell me about your project..."
                  rows={6}
                />
                {errors.message && <span className={styles.error}>{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.copyright}>© 2026</span>
        <div className={styles.footerLinks}>
          <Link href="/imprint" className={styles.footerLink}>IMPRINT & DATA PRIVACY</Link>
        </div>
        <span className={styles.credit}>DESIGN & DEVELOPMENT BY AICHA EL HALI</span>
      </footer>
    </div>
  );
}
