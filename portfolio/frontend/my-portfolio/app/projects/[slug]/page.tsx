import styles from './page.module.css'
import SiteHeader from '../../components/SiteHeader'
import Link from 'next/link'

const projects = {
  atlas: {
    title: 'ATLAS',
    year: '2023',
    services: 'Design · Development',
    description: 'Designing a concept lunar base & website for the European Space Agency.',
    image: '/images/projects/atlas-large.jpg',
    live: 'https://atlas-grg19.webflow.io'
  },
  neon: {
    title: 'NEON',
    year: '2022',
    services: 'Brand · UI',
    description: 'A visual identity and landing experience for a creative studio.',
    image: '/images/projects/neon-large.jpg',
    live: '#'
  },
  folio: {
    title: 'FOLIO',
    year: '2024',
    services: 'Product · Web',
    description: 'A minimal portfolio template focused on content and performance.',
    image: '/images/projects/folio-large.jpg',
    live: '#'
  }
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]
  if (!project) return <div className={styles.page}><p>Project not found.</p></div>

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <aside className={styles.left}>
          <h1 className={styles.title}>{project.title}</h1>

          <div className={styles.metaList}>
            <div className={styles.metaRow}><span>YEAR</span><strong>{project.year}</strong></div>
            <div className={styles.metaRow}><span>SERVICES</span><strong>{project.services}</strong></div>
            <div className={styles.metaRow}><span>LIVE SITE</span><a href={project.live} target="_blank" rel="noreferrer">{project.live}</a></div>
          </div>
        </aside>

        <section className={styles.right}>
          <div className={styles.heroImage} style={{ backgroundImage: `url(${project.image})` }} />
          <div className={styles.textBlock}>
            <p className={styles.lead}>{project.description}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
