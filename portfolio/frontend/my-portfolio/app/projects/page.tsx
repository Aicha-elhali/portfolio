import styles from './page.module.css'
import SiteHeader from '../components/SiteHeader'
import Link from 'next/link'

const projects = [
  {
    slug: 'atlas',
    title: 'ATLAS',
    year: '2023',
    services: 'Design · Development',
    description: 'Designing a concept lunar base & website for the European Space Agency.',
    image: '/images/projects/atlas.jpg'
  },
  {
    slug: 'neon',
    title: 'NEON',
    year: '2022',
    services: 'Brand · UI',
    description: 'A visual identity and landing experience for a creative studio.',
    image: '/images/projects/neon.jpg'
  },
  {
    slug: 'folio',
    title: 'FOLIO',
    year: '2024',
    services: 'Product · Web',
    description: 'A minimal portfolio template focused on content and performance.',
    image: '/images/projects/folio.jpg'
  }
]

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <aside className={styles.left}> 
          <h1 className={styles.title}>PROJECTS</h1>
        </aside>

        <section className={styles.grid}>
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.card}>
              <div className={styles.cardImage} style={{ backgroundImage: `url(${p.image})` }} />
              <div className={styles.cardMeta}>
                <div className={styles.metaLeft}>
                  <div className={styles.metaLabel}>YEAR</div>
                  <div className={styles.metaValue}>{p.year}</div>
                  <div className={styles.metaLabel}>SERVICES</div>
                  <div className={styles.metaValue}>{p.services}</div>
                </div>
                <div className={styles.metaRight}>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <p className={styles.cardDesc}>{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
