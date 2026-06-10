/**
 * Projects Page - Static Data
 * Author: Aicha El Hali
 */

"use client";

import { useState } from 'react';
import styles from './page.module.css';
import SiteHeader from '../components/SiteHeader';
import BackgroundStrokes from '../components/BackgroundStrokes';
import Footer from '../components/Footer';
import Link from 'next/link';

const projects = [
  {
    slug: 'haribo',
    title: 'HARIBO',
    year: '2025',
    services: 'Re-design · Brand',
    description: 'Redesign of a candy company, turning it into a 80s supplement provider.',
    image: '/images/haribo.jpg',
  },
  {
    slug: 'social-media-agents',
    title: 'Social Media Agents',
    year: '2025/26',
    services: 'Agents · N8N',
    description: 'Automated social media content for the world\'s largest shopping engagement platform.',
    image: '/images/atolls.jpg',
  },
  {
    slug: 'stylemate',
    title: 'StyleMate',
    year: '2024',
    services: 'Chatbot · UI',
    description: 'A chatbot that specializes on the users personal style for recommendation.',
    image: '/images/stylemate.jpg',
  },
  {
    slug: 'spacey',
    title: 'Spacey',
    year: '2025',
    services: 'Product · UI',
    description: 'What to do with empty spaces in Munich? Check out the ideas and the prototype.',
    image: '/images/spacey.jpg',
  },
  {
    slug: 'moosburg',
    title: 'Moosburg',
    year: '2025/26',
    services: 'Prototype · Research',
    description: 'A Prototype for the city Moosburg about historical sites for the POW.',
    image: '/images/moosburg.jpg',
  },
  {
    slug: 'ebay',
    title: 'Ebay',
    year: '2024',
    services: 'Product · UI',
    description: 'A redesign of the Ebay product site for a better user experience.',
    image: '/images/ebay.jpg',
  },
  {
    slug: 'hangman',
    title: 'Hangman',
    year: '2025',
    services: 'React · Playful',
    description: 'Check out my hangman game I made the day it was due.',
    image: '/images/hangman.jpg',
  },
];

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <BackgroundStrokes />
      <SiteHeader />

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h1 className={styles.title}>PROJECTS</h1>
            <p className={styles.subtitle}>
              Browse through my projects from previous semesters
            </p>
            <div className={styles.projectCount}>
              <span className={styles.countNumber}>{projects.length}</span>
              <span className={styles.countLabel}>Projects</span>
            </div>
          </div>
        </aside>

        <section className={styles.projectsList}>
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.projectCard}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.projectIndex}>
                [{String(index + 1).padStart(2, '0')}]
              </div>

              <div className={styles.projectImageWrapper}>
                <div
                  className={styles.projectImage}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className={styles.projectOverlay}>
                  <span className={styles.viewText}>VIEW PROJECT</span>
                </div>
              </div>

              <div className={styles.projectInfo}>
                <div className={styles.projectHeader}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <span className={styles.projectYear}>{project.year}</span>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectServices}>{project.services}</div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}