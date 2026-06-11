/**
 * Project Detail Page
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import styles from './page.module.css'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import PrototypeEmbed from '../../components/PrototypeEmbed'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects, getProjectBySlug } from '../../data/projects'

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

// Maps a tool name → icon src. Most use the simple-icons CDN
// (cdn.simpleicons.org/<slug>/<color>), but Adobe removed its brand icons from
// simple-icons (trademark), so Photoshop/Illustrator are served locally.
// Tools without a match render as text only.
const TOOL_ICONS: Record<string, string> = {
  Figma: 'https://cdn.simpleicons.org/figma/F24E1E',
  Photoshop: '/icons/photoshop.svg',
  'Adobe Photoshop': '/icons/photoshop.svg',
  Illustrator: '/icons/illustrator.svg',
  'Adobe Illustrator': '/icons/illustrator.svg',
  Blender: 'https://cdn.simpleicons.org/blender/E87D0D',
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  TypeScript: 'https://cdn.simpleicons.org/typescript/3178C6',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  N8N: 'https://cdn.simpleicons.org/n8n/EA4B71',
  Zapier: 'https://cdn.simpleicons.org/zapier/FF4F00',
}

// Per-project SEO + social-share metadata
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project not found' }
  }

  const title = `${project.title} — Aicha El Hali`

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      images: [{ url: project.image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const hasFonts = Boolean(project.fonts?.length)
  const hasLogo = Boolean(project.logoNote || project.logoImage)
  const hasIdentity = Boolean(project.paletteNote || project.paletteImage)
  const hasMockup = Boolean(project.mockupNote || project.mockupImage)
  const hasProduct = Boolean(project.productNote || project.productImage)
  const hasRebrand = Boolean(project.rebrandNote || project.rebrandImage)

  const story = [
    { num: '01', label: 'Context', text: project.context },
    { num: '02', label: 'Problem', text: project.problem },
    { num: '03', label: 'Solution', text: project.solution },
  ]

  return (
    <div className={styles.page}>
      {/* Header Component */}
      <SiteHeader />

      {/* Fixed full-screen hero image — the content slides up over it on scroll */}
      <header className={styles.heroMedia}>
        <Image
          src={project.image}
          alt={`${project.title} — cover`}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.heroScrim} />
        <span className={styles.scrollCue} aria-hidden="true">↓</span>
      </header>

      {/* Content slides up over the hero image */}
      <div className={styles.content}>
        <main className={styles.main}>
          {/* Back Link */}
          <Link href="/projects" className={styles.backLink}>
            <span className={styles.backArrow}>←</span>
            <span>Back to Projects</span>
          </Link>

          {/* Overview — title + general info (role / duration / company / year) */}
          <section className={styles.overview}>
            <div className={styles.overviewTop}>
              <div className={styles.overviewLeft}>
                <h1 className={styles.overviewTitle}>{project.title}</h1>
                <p className={styles.overviewLead}>{project.description}</p>
              </div>
              <dl className={styles.overviewMeta}>
                <div className={styles.overviewRow}>
                  <dt className={styles.overviewLabel}>Role</dt>
                  <dd className={styles.overviewValue}>{project.services}</dd>
                </div>
                <div className={styles.overviewRow}>
                  <dt className={styles.overviewLabel}>Duration</dt>
                  <dd className={styles.overviewValue}>{project.duration}</dd>
                </div>
                <div className={styles.overviewRow}>
                  <dt className={styles.overviewLabel}>Semester</dt>
                  <dd className={styles.overviewValue}>{project.semester}</dd>
                </div>
                <div className={styles.overviewRow}>
                  <dt className={styles.overviewLabel}>Year</dt>
                  <dd className={styles.overviewValue}>{project.year}</dd>
                </div>
              </dl>
            </div>
          </section>

        {/* Story: Context / Problem / Solution — text only */}
        <section className={styles.story}>
          {story.map((block) => (
            <article key={block.num} className={styles.storyBlock}>
              <div className={styles.storyTitleRow}>
                <span className={styles.storyNum}>{block.num}</span>
                <h2 className={styles.storyTitle}>{block.label}</h2>
              </div>
              <p className={styles.storyText}>{block.text}</p>
            </article>
          ))}
        </section>

        {/* Visuals — full-width video (placeholder until a video is added) */}
        <section className={styles.showcase}>
          {project.prototype ? (
            <div className={styles.prototypeLabel}>
              <span className={styles.prototypeLine} aria-hidden="true" />
              <h2 className={styles.prototypeTitle}>Test it yourself</h2>
            </div>
          ) : (
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelNum}>—</span>
              <span>Visuals</span>
            </div>
          )}
          <div className={styles.videoBlock}>
            {project.prototype ? (
              <PrototypeEmbed
                url={project.prototype}
                title={`${project.title} — Figma prototype`}
              />
            ) : project.video ? (
              <video
                className={styles.video}
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div className={styles.videoPlaceholder}>
                <span className={styles.playIcon}>▶</span>
                <span className={styles.videoLabel}>Video coming soon</span>
              </div>
            )}
          </div>
        </section>

        {/* Rebrand — image left, description right (asymmetry) */}
        {hasRebrand && (
          <section className={styles.identity}>
            <div className={styles.identityHead}>
              <span className={styles.identityIndex}>04</span>
              <h2 className={styles.identityTitle}>Rebrand</h2>
            </div>

            {/* Image left (wide), description right (narrow) */}
            <div className={styles.rebrandGrid}>
              {project.rebrandImage && (
                <div className={styles.paletteImage}>
                  <Image
                    src={project.rebrandImage}
                    alt={`${project.title} — rebrand`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              )}
              <div className={styles.paletteInfo}>
                <span className={styles.cardLabel}>Rebrand</span>
                <p className={styles.paletteDesc}>{project.rebrandNote}</p>
              </div>
            </div>
          </section>
        )}

        {/* Visual Identity — Palette: description left, image right */}
        {hasIdentity && (
          <section className={styles.identity}>
            <div className={styles.identityHead}>
              <span className={styles.identityIndex}>05</span>
              <h2 className={styles.identityTitle}>Visual Identity</h2>
            </div>

            {/* Description left, big palette image right */}
            <div className={styles.identityGrid}>
              <div className={styles.paletteInfo}>
                <span className={styles.cardLabel}>Palette</span>
                <p className={styles.paletteDesc}>{project.paletteNote}</p>
                {project.palette && project.palette.length > 0 && (
                  <ul className={styles.swatches}>
                    {project.palette.map((color) => (
                      <li key={color.hex} className={styles.swatch}>
                        <span
                          className={styles.swatchChip}
                          style={{ background: color.hex }}
                          aria-hidden="true"
                        />
                        <span className={styles.swatchName}>{color.name}</span>
                        <span className={styles.swatchHex}>{color.hex}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {project.paletteImage && (
                <div className={styles.paletteImage}>
                  <Image
                    src={project.paletteImage}
                    alt={`${project.title} — colour palette`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Typography — font specimens (image placeholders) + title & description */}
        {hasFonts && (
          <section className={styles.fonts}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelNum}>—</span>
              <span>Typography</span>
            </div>
            <div className={styles.fontsGrid}>
              {project.fonts!.map((font, index) => (
                <article key={index} className={styles.fontCard}>
                  <div className={styles.fontImage}>
                    {font.image ? (
                      <Image
                        src={font.image}
                        alt={`${project.title} — ${font.name} specimen`}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    ) : (
                      <div className={styles.fontPlaceholder}>
                        <span className={styles.fontPlaceholderGlyph}>Aa</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.fontHead}>
                    <h3 className={styles.fontName}>{font.name}</h3>
                    <span className={styles.fontTag}>Font</span>
                  </div>
                  <p className={styles.fontDesc}>{font.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Logo — image left, description right */}
        {hasLogo && (
          <section className={styles.identity}>
            <div className={styles.identityHead}>
              <span className={styles.identityIndex}>06</span>
              <h2 className={styles.identityTitle}>Logo</h2>
            </div>

            <div className={styles.rebrandGrid}>
              {project.logoImage && (
                <div className={styles.paletteImage}>
                  <Image
                    src={project.logoImage}
                    alt={`${project.title} — logo`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              )}
              <div className={styles.paletteInfo}>
                <span className={styles.cardLabel}>Logo</span>
                <p className={styles.paletteDesc}>{project.logoNote}</p>
              </div>
            </div>
          </section>
        )}

        {/* Product summary — description left, image right */}
        {hasProduct && (
          <section className={styles.identity}>
            <div className={styles.identityHead}>
              <span className={styles.identityIndex}>07</span>
              <h2 className={styles.identityTitle}>Product Summary</h2>
            </div>

            <div className={styles.identityGrid}>
              <div className={styles.paletteInfo}>
                <span className={styles.cardLabel}>Products</span>
                <p className={styles.paletteDesc}>{project.productNote}</p>
              </div>
              {project.productImage && (
                <div className={styles.paletteImage}>
                  <Image
                    src={project.productImage}
                    alt={`${project.title} — product summary`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Mockup — image left, description right */}
        {hasMockup && (
          <section className={styles.identity}>
            <div className={styles.identityHead}>
              <span className={styles.identityIndex}>08</span>
              <h2 className={styles.identityTitle}>Mockup</h2>
            </div>

            <div className={styles.rebrandGrid}>
              {project.mockupImage && (
                <div className={styles.paletteImage}>
                  <Image
                    src={project.mockupImage}
                    alt={`${project.title} — mockup`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              )}
              <div className={styles.paletteInfo}>
                <span className={styles.cardLabel}>Mockup</span>
                <p className={styles.paletteDesc}>{project.mockupNote}</p>
              </div>
            </div>
          </section>
        )}

        {/* Tools + Live link */}
        <section className={styles.meta}>
          <div className={styles.metaBlock}>
            <h3 className={styles.metaTitle}>Tools & Technologies</h3>
            <div className={styles.toolsList}>
              {project.tools.map((tool, index) => {
                const icon = TOOL_ICONS[tool]
                return (
                  <span key={index} className={styles.toolTag}>
                    {icon && (
                      <img
                        src={icon}
                        alt=""
                        className={styles.toolIcon}
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                    )}
                    {tool}
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        {/* Closing CTA — final presentation */}
        {project.link && (
          <section className={styles.cta}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              View my final presentation →
            </a>
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
    </div>
  )
}
