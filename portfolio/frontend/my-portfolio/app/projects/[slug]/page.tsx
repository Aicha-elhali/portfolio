/**
 * Project Detail Page
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import styles from './page.module.css'
import SiteHeader from '../../components/SiteHeader'
import BackgroundStrokes from '../../components/BackgroundStrokes'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Projects data - prepared for future backend
const projectsData: Record<string, {
  title: string;
  year: string;
  services: string;
  description: string;
  image: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  tools: string[];
  gallery: string[];
  link?: string;
}> = {
  'haribo': {
    title: 'HARIBO',
    year: '2025',
    services: 'Re-design · Brand',
    description: 'Redesign of a candy company, turning it into a 80`s supplement provider.',
    image: '/images/haribo.jpg',
    fullDescription: 'HARIBO, the iconic candy brand known for its gummy bears, undergoes a radical transformation in this concept project. The redesign reimagines the brand as a premium 80s-inspired supplement provider, blending nostalgia with modern wellness trends. The project explores how a beloved confectionery brand could pivot to the health and fitness market while maintaining its playful essence.',
    challenge: 'The main challenge was to preserve the recognizable HARIBO brand identity while completely shifting its market positioning. How do you take a brand synonymous with sugary treats and make it credible in the health supplement space? The design needed to bridge the gap between indulgence and wellness.',
    solution: 'The solution embraced the 80s aesthetic with bold neon colors, geometric patterns, and retro typography. The iconic HARIBO bear was reimagined as a muscular fitness mascot. Product packaging features vibrant gradients and chrome effects typical of 80s design, while maintaining the playful spirit that makes HARIBO beloved worldwide.',
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Blender'],
    gallery: ['/images/font.jpg', '/images/haribo_products.jpg', '/images/palette.jpg'],
    link: 'https://www.figma.com/slides/YvAJxE97Wij40s5lMsDBxq/Haribo-retro?node-id=32-287&t=O9DH4tKoP3lU1XOu-0'
  },
  'social-media-agents': {
    title: 'Social Media Agents',
    year: '2025/26',
    services: 'Agents · N8N',
    description: 'Automated social media content for the world´s largest shopping engagement platform.',
    image: '/images/atolls.jpg',
    fullDescription: 'An innovative automation project that leverages AI agents to generate and manage social media content at scale.',
    challenge: 'Creating consistent, engaging content across multiple platforms while maintaining brand voice.',
    solution: 'Developed a network of AI agents using N8N that collaborate to create, review, and publish content.',
    tools: ['N8N', 'OpenAI API', 'Python', 'Zapier'],
    gallery: ['/images/atolls.jpg'],
  },
  'stylemate': {
    title: 'StyleMate',
    year: '2024',
    services: 'Chatbot · UI',
    description: 'A chatbot that specializes on the users personal style for recommendation',
    image: '/images/stylemate.jpg',
    fullDescription: 'StyleMate is an AI-powered fashion assistant that learns your personal style preferences.',
    challenge: 'Understanding individual style preferences and providing personalized recommendations.',
    solution: 'Created an intuitive chatbot interface with a style quiz and visual preference learning.',
    tools: ['React', 'Node.js', 'OpenAI API', 'Figma'],
    gallery: ['/images/stylemate.jpg'],
  },
  'spacey': {
    title: 'Spacey',
    year: '2025',
    services: 'Product · UI',
    description: 'What to do with empty spaces in Munich? Check out the ideas and the prototype',
    image: '/images/spacey.jpg',
    fullDescription: 'Spacey addresses the urban challenge of unused spaces in Munich.',
    challenge: 'Connecting space owners with creative individuals and businesses looking for temporary venues.',
    solution: 'A platform that makes discovering and booking temporary spaces simple and accessible.',
    tools: ['Figma', 'React', 'Next.js', 'Tailwind CSS'],
    gallery: ['/images/spacey.jpg'],
  },
  'moosburg': {
    title: 'Moosburg',
    year: '2025/26',
    services: 'Prototype · Research',
    description: 'A Prototype for the city Moosburg about historcial sites for the POW',
    image: '/images/moosburg.jpg',
    fullDescription: 'A research-driven prototype exploring the historical significance of POW sites in Moosburg.',
    challenge: 'Presenting sensitive historical information in an accessible and respectful manner.',
    solution: 'An interactive digital experience that guides users through historical locations.',
    tools: ['Figma', 'Adobe XD', 'After Effects'],
    gallery: ['/images/moosburg.jpg'],
  },
  'ebay': {
    title: 'Ebay',
    year: '2024',
    services: 'Product · UI',
    description: 'A redesign of the Ebay product site for a better user experience.',
    image: '/images/ebay.jpg',
    fullDescription: 'A comprehensive UX/UI redesign of the Ebay product pages.',
    challenge: 'Simplifying a complex e-commerce interface while maintaining all necessary functionality.',
    solution: 'A cleaner, more intuitive design that prioritizes product information and user actions.',
    tools: ['Figma', 'Adobe Photoshop', 'Maze'],
    gallery: ['/images/ebay.jpg'],
  },
  'hangman': {
    title: 'Hangman',
    year: '2025',
    services: 'React · Playful',
    description: 'Check out my hangman game i made the day it was due.',
    image: '/images/hangman.jpg',
    fullDescription: 'A fun, interactive Hangman game built with React.',
    challenge: 'Creating an engaging game experience with smooth animations under time pressure.',
    solution: 'A minimalist but polished game with keyboard support and visual feedback.',
    tools: ['React', 'TypeScript', 'CSS Animations'],
    gallery: ['/images/hangman.jpg'],
  }
}

// Generate static params for all projects
export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }))
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) {
    notFound()
  }

  return (
    <div className={styles.page}>
      {/* Background Strokes Component */}
      <BackgroundStrokes />

      {/* Header Component */}
      <SiteHeader />

      <main className={styles.main}>
        {/* Back Link */}
        <Link href="/projects" className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.projectYear}>{project.year}</span>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <p className={styles.projectTagline}>{project.description}</p>
            <div className={styles.projectServices}>{project.services}</div>
          </div>
        </section>

        {/* Main Image */}
        <div className={styles.mainImageWrapper}>
          <div 
            className={styles.mainImage}
            style={{ backgroundImage: `url(${project.image})` }}
          />
        </div>

        {/* Project Details */}
        <section className={styles.details}>
          <div className={styles.detailsGrid}>
            {/* Left Column - Overview */}
            <div className={styles.overview}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.fullDescription}>{project.fullDescription}</p>
              
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  View Live Project →
                </a>
              )}
            </div>

            {/* Right Column - Info */}
            <div className={styles.info}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Tools & Technologies</h3>
                <div className={styles.toolsList}>
                  {project.tools.map((tool, index) => (
                    <span key={index} className={styles.toolTag}>{tool}</span>
                  ))}
                </div>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Year</h3>
                <p className={styles.infoValue}>{project.year}</p>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Services</h3>
                <p className={styles.infoValue}>{project.services}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className={styles.challengeSolution}>
          <div className={styles.csGrid}>
            <div className={styles.csBlock}>
              <h2 className={styles.csTitle}>The Challenge</h2>
              <p className={styles.csText}>{project.challenge}</p>
            </div>
            <div className={styles.csBlock}>
              <h2 className={styles.csTitle}>The Solution</h2>
              <p className={styles.csText}>{project.solution}</p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.gallery.length > 1 && (
          <section className={styles.gallery}>
            <h2 className={styles.sectionTitle}>Gallery</h2>
            <div className={styles.galleryGrid}>
              {project.gallery.map((image, index) => (
                <div 
                  key={index}
                  className={styles.galleryImage}
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <nav className={styles.projectNav}>
          <Link href="/projects" className={styles.navButton}>
            ← All Projects
          </Link>
        </nav>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}