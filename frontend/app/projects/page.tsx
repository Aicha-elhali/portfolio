/**
 * Projects Page - Static Data
 * Banner hero + vertically stacked projects with an asymmetric, alternating layout.
 * Author: Aicha El Hali
 */

"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import SiteHeader from '../components/SiteHeader';
import BackgroundStrokes from '../components/BackgroundStrokes';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { projects, type Project } from '../data/projects';

// Reveal-on-scroll: fade each project row up as it enters the viewport.
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const reversed = index % 2 === 1;

  const meta = [
    { label: 'Semester', value: project.semester },
    { label: 'Duration', value: project.duration },
    { label: 'Topic', value: project.services },
  ];

  return (
    <article
      ref={ref}
      className={`${styles.row} ${reversed ? styles.reversed : ''} ${isInView ? styles.revealed : ''}`}
    >
      {/* Picture stands alone */}
      <Link href={`/projects/${project.slug}`} className={styles.mediaLink}>
        <div className={styles.media}>
          {project.video ? (
            <video
              className={styles.mediaInner}
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} — project preview`}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              className={styles.mediaInner}
              style={{ objectFit: 'cover' }}
              priority={index < 2}
            />
          )}
        </div>
      </Link>

      {/* All text + meta on the side */}
      <aside className={styles.info}>
        <span className={styles.bigIndex} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.infoHead}>
          <h2 className={styles.company}>{project.title}</h2>
          <p className={styles.description}>{project.description}</p>
        </div>

        <dl className={styles.metaList}>
          {meta.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <dt className={styles.metaLabel}>{item.label}</dt>
              <dd className={styles.metaValue}>{item.value}</dd>
            </div>
          ))}
        </dl>

        <Link href={`/projects/${project.slug}`} className={styles.cta}>
          <span>VIEW PROJECT</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </aside>
    </article>
  );
}

export default function ProjectsPage() {
  // Scramble "DIVE INTO" into place on mount (spaces preserved)
  const [diveText, setDiveText] = useState('DIVE INTO');

  useEffect(() => {
    const target = 'DIVE INTO';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const maxIterations = 10;
    let iteration = 0;
    const interval = setInterval(() => {
      setDiveText(
        target
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            return iteration > index * 0.8 ? char : chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1;
      if (iteration > target.length + maxIterations) {
        clearInterval(interval);
        setDiveText(target);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <BackgroundStrokes />
      <SiteHeader />

      <main className={styles.pageMain}>
        {/* ============== BANNER ============== */}
        <section className={styles.banner}>
          <div className={styles.bannerRow}>
            <div className={styles.bannerLeft}>
              <div className={styles.eyebrowRow}>
                <span className={styles.decorLine}></span>
                <span className={styles.eyebrow}>SELECTED WORK</span>
              </div>
              <h1 className={styles.bannerTitle}>
                <span className={styles.bannerStrong}>{diveText}</span>
                <span className={styles.bannerSoft}>my recent work.</span>
              </h1>
            </div>
            <p className={styles.bannerText}>
              A selection of projects from my studies and side work — across brand,
              product, UI and a bit of code. Each one pushed me to dig a little deeper.
            </p>
          </div>
        </section>

        {/* ============== PROJECTS ============== */}
        <section className={styles.projects}>
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
