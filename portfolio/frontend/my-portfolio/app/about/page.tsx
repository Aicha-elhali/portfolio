/**
 * About Page - Redesigned
 * Author: Aicha El Hali
 */

"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SiteHeader from "../components/SiteHeader";
import BackgroundStrokes from "../components/BackgroundStrokes";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsInView(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const introRef = useInView<HTMLDivElement>();
  const journeyRef = useInView<HTMLDivElement>();
  const galleryRef = useInView<HTMLDivElement>();
  const rootsRef = useInView<HTMLDivElement>();
  const studyRef = useInView<HTMLDivElement>();
  const stackRef = useInView<HTMLDivElement>();
  const beyondRef = useInView<HTMLDivElement>();

  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className={styles.page}>
      <BackgroundStrokes />
      <SiteHeader />

      <main className={styles.main}>
        {/* ============== HERO ============== */}
        <section className={styles.hero}>
          <div className={styles.heroDecor}>
            <span className={styles.decorLine}></span>
            <span className={styles.decorText}>GET TO KNOW ME</span>
          </div>
          <h1 className={`${styles.heroTitle} ${isLoaded ? styles.visible : ''}`}>
            ABOUT
          </h1>
        </section>

        {/* ============== INTRO (Photo + Text) ============== */}
        <section
          ref={introRef.ref}
          className={`${styles.introSection} ${introRef.isInView ? styles.inView : ''}`}
        >
          <div className={styles.introGrid}>
            <div className={styles.introImageCol}>
              <div className={styles.introImageWrapper}>
                <Image
                  src="/images/profile.jpg"
                  alt="Aicha El Hali"
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className={styles.introImage}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
            <div className={styles.introTextCol}>
              <h2 className={styles.introTitle}>
                <span className={styles.introTitleStrong}>DESIGNER</span>
                <span className={styles.introTitleSoft}>&amp; Developer.</span>
              </h2>
              <div className={styles.introDetails}>
                <p className={styles.introBody}>
                  Born in Munich with Moroccan roots, studying <strong className={styles.textAccent}>CS &amp; Design</strong> at Hochschule München. I thrive in teams where ideas collide. I contribute mine and sharpen them through collaboration.
                </p>
                <p className={styles.introBody}>
                  I look beyond the horizon, literally. London, Shanghai, across many European countries, and across Africa. Every trip reshaped how I think about design and people. It&apos;s not about learning from one source. It&apos;s about building a <strong className={styles.textAccent}>universal understanding</strong>, breaking out of the bubble, and bringing those perspectives back into the work.
                </p>
                <p className={styles.introBody}>
                  From rapid prototyping at BMW to exploring robotics at <strong className={styles.textAccent}>Tongji University</strong> in Shanghai, I adapt fast, pick up new technologies faster, and never stop being <strong className={styles.textAccent}>curious</strong>.
                </p>
                <div className={styles.focusAreas}>
                  <span className={styles.focusTag}>AI / Agents</span>
                  <span className={styles.focusTag}>UI/UX</span>
                  <span className={styles.focusTag}>Backend/Frontend</span>
                  <span className={styles.focusTag}>Research</span>
                  <span className={styles.focusTag}>Prototyping</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== MOMENTS ============== */}
        <section
          ref={galleryRef.ref}
          className={`${styles.gallerySection} ${galleryRef.isInView ? styles.inView : ''}`}
        >
          <span className={styles.sectionLabel}>MOMENTS</span>
          <Gallery />
        </section>

        {/* ============== MY JOURNEY ============== */}
        <section
          ref={journeyRef.ref}
          className={`${styles.journeySection} ${journeyRef.isInView ? styles.inView : ''}`}
        >
          <span className={styles.sectionLabel}>MY JOURNEY</span>
          <div className={styles.journeyTimeline}>
            <div className={styles.journeyItem}>
              <span className={styles.journeyDate}>PRE-2022</span>
              <div className={styles.journeyContent}>
                <h3 className={styles.journeyTitle}>Real-World Experience</h3>
                <p className={styles.journeyText}>
                  Insurance, law, and gastronomy. Working across industries before tech taught me how different people interact with systems and services.
                </p>
              </div>
            </div>
            <div className={styles.journeyItem}>
              <span className={styles.journeyDate}>2022 — 2024</span>
              <div className={styles.journeyContent}>
                <h3 className={styles.journeyTitle}>Abitur · International Economy</h3>
                <p className={styles.journeyText}>
                  At Therese-von-Bayern FOS in Munich, I first explored business thinking and developed a strong interest in how systems work.
                </p>
              </div>
            </div>
            <div className={styles.journeyItem}>
              <span className={styles.journeyDate}>2024 — 2027</span>
              <div className={styles.journeyContent}>
                <h3 className={styles.journeyTitle}>B.Sc. Computer Science &amp; Design</h3>
                <p className={styles.journeyText}>
                  At Hochschule München, I made the jump into tech, combining code with design to build products that actually work for people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============== ROOTS (München + Marokko) ============== */}
        <section
          ref={rootsRef.ref}
          className={`${styles.rootsSection} ${rootsRef.isInView ? styles.inView : ''}`}
        >
          <span className={styles.sectionLabel}>ROOTS</span>
          <div className={styles.rootsGrid}>
            <div className={styles.rootsItem}>
              
              <h3 className={styles.rootsTitle}>München</h3>
              <p className={styles.rootsText}>
                Born and raised with German precision and Bavarian warmth.
              </p>
            </div>
            <div className={styles.rootsDivider}></div>
            <div className={styles.rootsItem}>
              
              <h3 className={styles.rootsTitle}>Moroccan Heritage</h3>
              <p className={styles.rootsText}>
                Culture, hospitality, and a different way of seeing the world.
              </p>
            </div>
            <div className={styles.rootsDivider}></div>
            <div className={styles.rootsItem}>
              
              <h3 className={styles.rootsTitle}>3 Languages</h3>
              <p className={styles.rootsText}>
                Deutsch · English · العربية
              </p>
            </div>
          </div>
        </section>

        {/* ============== STUDIUM ============== */}
        <section
          ref={studyRef.ref}
          className={`${styles.studySection} ${studyRef.isInView ? styles.inView : ''}`}
        >
          <span className={styles.sectionLabel}>EDUCATION</span>
          <div className={styles.studyContent}>
            <h2 className={styles.studyTitle}>
              Computer Science<br />
              <span className={styles.studyAmpersand}>&amp;</span> Design
            </h2>
            <div className={styles.studyDetails}>
              <div className={styles.studyMeta}>
                <span className={styles.studyMetaLabel}>UNIVERSITY</span>
                <span className={styles.studyMetaValue}>Hochschule München</span>
              </div>
              <div className={styles.studyMeta}>
                <span className={styles.studyMetaLabel}>SEMESTER</span>
                <span className={styles.studyMetaValue}>4th</span>
              </div>
              <div className={styles.studyMeta}>
                <span className={styles.studyMetaLabel}>FOCUS</span>
                <span className={styles.studyMetaValue}>AI · UX/UI · Digital Product Design</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============== FAV STACK ============== */}
        <section
          ref={stackRef.ref}
          className={`${styles.stackSection} ${stackRef.isInView ? styles.inView : ''}`}
        >
          <span className={styles.sectionLabel}>FAV STACK</span>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>
              <img
                src="https://cdn.simpleicons.org/figma/F24E1E"
                alt="Figma"
                className={styles.stackIcon}
                width={80}
                height={80}
              />
              <span className={styles.stackName}>Figma</span>
              <span className={styles.stackRole}>Design</span>
            </div>
            <span className={styles.stackPlus}>+</span>
            <div className={styles.stackItem}>
              <img
                src="https://cdn.simpleicons.org/react/61DAFB"
                alt="React"
                className={styles.stackIcon}
                width={80}
                height={80}
              />
              <span className={styles.stackName}>React</span>
              <span className={styles.stackRole}>Build</span>
            </div>
            <span className={styles.stackPlus}>+</span>
            <div className={styles.stackItem}>
              <img
                src="https://cdn.simpleicons.org/nextdotjs/FFFFFF"
                alt="Next.js"
                className={styles.stackIcon}
                width={80}
                height={80}
              />
              <span className={styles.stackName}>Next.js</span>
              <span className={styles.stackRole}>Ship</span>
            </div>
          </div>
          <p className={styles.stackQuote}>
            Design → Build → Ship. That&apos;s the loop I live in.
          </p>
        </section>

        {/* ============== BEYOND CODE ============== */}
        <section
          ref={beyondRef.ref}
          className={`${styles.beyondSection} ${beyondRef.isInView ? styles.inView : ''}`}
        >
          <span className={styles.sectionLabel}>BEYOND CODE</span>
          <div className={styles.beyondList}>
            <div className={styles.beyondItem}>
              <span className={styles.beyondIndex}>01</span>
              <h3 className={styles.beyondName}>Chess</h3>
              <p className={styles.beyondDesc}>Strategic thinking, applied differently</p>
            </div>
            <div className={styles.beyondItem}>
              <span className={styles.beyondIndex}>02</span>
              <h3 className={styles.beyondName}>Swimming</h3>
              <p className={styles.beyondDesc}>Where I clear my head</p>
            </div>
            <div className={styles.beyondItem}>
              <span className={styles.beyondIndex}>03</span>
              <h3 className={styles.beyondName}>Padel</h3>
              <p className={styles.beyondDesc}>New obsession, competitive spirit</p>
            </div>
            <div className={styles.beyondItem}>
              <span className={styles.beyondIndex}>04</span>
              <h3 className={styles.beyondName}>Gaming</h3>
              <p className={styles.beyondDesc}>UI inspiration from unexpected places</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}