/**
 * Projects Page
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

"use client";

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import SiteHeader from '../components/SiteHeader'
import BackgroundStrokes from '../components/BackgroundStrokes'
import Link from 'next/link'
import { getAuthHeader } from '../contexts/AuthContext'

// Interface für Projekt-Daten
interface Project {
  _id: string;
  slug: string;
  title: string;
  year: string;
  services: string;
  description: string;
  image: string;
  live?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // API-Aufruf mit Auth-Token
        const response = await fetch('http://localhost:5001/api/projects', {
          headers: {
            ...getAuthHeader(),
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to load projects');
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={styles.page}>
      {/* Background Strokes Komponente */}
      <BackgroundStrokes />
      
      {/* Header Komponente */}
      <SiteHeader />
      
      <main className={styles.main}>
        {/* Fixed Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h1 className={styles.title}>PROJECTS</h1>
            <p className={styles.subtitle}>
              Browse through many projects from previous semesters
            </p>
            <div className={styles.projectCount}>
              <span className={styles.countNumber}>{projects.length}</span>
              <span className={styles.countLabel}>Projects</span>
            </div>
          </div>
        </aside>

        {/* Scrollable Projects List */}
        <section className={styles.projectsList}>
          {isLoading ? (
            <div className={styles.loadingMessage}>
              Loading projects...
            </div>
          ) : error ? (
            <div className={styles.errorMessage}>
              {error}
            </div>
          ) : projects.length === 0 ? (
            <div className={styles.emptyMessage}>
              No projects found.
            </div>
          ) : (
            projects.map((project, index) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`} 
                className={styles.projectCard}
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
          ))
          )}
        </section>
      </main>
    </div>
  )
}