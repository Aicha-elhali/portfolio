/**
 * Contact Page
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import styles from "./page.module.css";
import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import BackgroundStrokes from "../components/BackgroundStrokes";
import Footer from "../components/Footer";

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
  const [submitError, setSubmitError] = useState("");

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
    setSubmitError("");
    
    try {
      // Sende Nachricht an Backend-API
      const response = await fetch('http://localhost:5001/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Fehlerbehandlung vom Backend
        if (data.errors) {
          setErrors({
            name: data.errors.name || "",
            email: data.errors.email || "",
            message: data.errors.message || "",
          });
        }
        throw new Error(data.message || 'Fehler beim Senden der Nachricht');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      setSubmitError(error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Background Strokes Komponente */}
      <BackgroundStrokes />

      {/* Header Komponente */}
      <SiteHeader />

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

              {submitError && (
                <div className={styles.submitError}>
                  {submitError}
                </div>
              )}
            </form>
          )}
        </div>
      </main>

      {/* Footer Komponente */}
      <Footer />
    </div>
  );
}