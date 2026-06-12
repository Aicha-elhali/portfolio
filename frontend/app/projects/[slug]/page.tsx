/**
 * Project Detail Page
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import { Fragment } from 'react'
import styles from './page.module.css'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import PrototypeEmbed from '../../components/PrototypeEmbed'
import ShowcaseVideo from '../../components/ShowcaseVideo'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects, getProjectBySlug, type ImagePair } from '../../data/projects'

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
  Claude: 'https://cdn.simpleicons.org/claude/D97757',
  Git: 'https://cdn.simpleicons.org/git/F05032',
  Photoshop: '/icons/photoshop.svg',
  'Adobe Photoshop': '/icons/photoshop.svg',
  Illustrator: '/icons/illustrator.svg',
  'Adobe Illustrator': '/icons/illustrator.svg',
  Blender: 'https://cdn.simpleicons.org/blender/E87D0D',
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  Svelte: 'https://cdn.simpleicons.org/svelte/FF3E00',
  'Three.js': 'https://cdn.simpleicons.org/threedotjs/FFFFFF',
  Vite: 'https://cdn.simpleicons.org/vite/646CFF',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  JavaScript: 'https://cdn.simpleicons.org/javascript/F7DF1E',
  HTML: 'https://cdn.simpleicons.org/html5/E34F26',
  CSS: 'https://cdn.simpleicons.org/css/663399',
  TypeScript: 'https://cdn.simpleicons.org/typescript/3178C6',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  N8N: 'https://cdn.simpleicons.org/n8n/EA4B71',
  n8n: 'https://cdn.simpleicons.org/n8n/EA4B71',
  Slack: '/icons/slack.svg',
  Airtable: 'https://cdn.simpleicons.org/airtable/18BFFF',
  LinkedIn: '/icons/linkedin.svg',
  Zapier: 'https://cdn.simpleicons.org/zapier/FF4F00',
}

// Renders story text with `==marked==` spans as a highlighter-style <mark>.
function renderMarked(text: string, markClass: string) {
  return text.split('==').map((segment, index) =>
    index % 2 === 1 ? (
      <mark key={index} className={markClass}>
        {segment}
      </mark>
    ) : (
      <span key={index}>{segment}</span>
    )
  )
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
  const hasHighlights = Boolean(project.highlights?.length)
  const hasSections = Boolean(project.sections?.length)

  const story = [
    { num: '01', label: 'Context', text: project.context },
    { num: '02', label: 'Problem', text: project.problem },
    { num: '03', label: 'Solution', text: project.solution },
  ]

  // Renders a two-image pair (large beside small). `largeSide` mirrors the layout.
  const renderImagePair = (pair: ImagePair, key: string) => {
    const largeRight = pair.largeSide === 'right'
    const large = (
      <Image
        src={pair.largeImage}
        alt={`${project.title} — ${pair.label ?? 'image'}`}
        width={3024}
        height={1701}
        sizes="(max-width: 900px) 100vw, 60vw"
        className={styles.imagePairImg}
      />
    )
    const small = (
      <Image
        src={pair.smallImage}
        alt={`${project.title} — ${pair.label ?? 'image'} detail`}
        width={3024}
        height={1701}
        sizes="(max-width: 900px) 100vw, 38vw"
        className={styles.imagePairImg}
      />
    )
    return (
      <section key={key} className={styles.fonts}>
        {pair.label && (
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelNum}>—</span>
            <span>{pair.label}</span>
          </div>
        )}
        <div className={largeRight ? styles.imagePairGridRight : styles.imagePairGrid}>
          {largeRight ? (
            <>
              {small}
              {large}
            </>
          ) : (
            <>
              {large}
              {small}
            </>
          )}
        </div>
      </section>
    )
  }

  // A pair is anchored mid-flow only if its afterSection matches a real section title.
  const sectionTitles = new Set(project.sections?.map((s) => s.title))
  const isAnchored = (pair: ImagePair) =>
    Boolean(pair.afterSection && sectionTitles.has(pair.afterSection))

  return (
    <div className={styles.page}>
      {/* Header Component */}
      <SiteHeader darkOverHero={project.heroDarkHeader} />

      {/* Fixed full-screen hero image — the content slides up over it on scroll */}
      <header className={styles.heroMedia}>
        {project.heroVideo ? (
          <video
            className={styles.heroVideo}
            src={project.heroVideo}
            poster={project.image}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={project.image}
            alt={`${project.title} — cover`}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
        {!project.heroNoScrim && <div className={styles.heroScrim} />}
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
              <p className={styles.storyText}>{renderMarked(block.text, styles.mark)}</p>
            </article>
          ))}
        </section>

        {/* Visuals — full-width video (placeholder until a video is added) */}
        <section className={styles.showcase}>
          {project.prototype ? (
            <div className={styles.prototypeLabel}>
              <span className={styles.prototypeLine} aria-hidden="true" />
              <h2 className={styles.prototypeTitle}>
                {project.prototypeTitle ?? 'Test it yourself'}
              </h2>
            </div>
          ) : project.showcaseImage ? (
            <div className={styles.prototypeLabel}>
              <span className={styles.prototypeLine} aria-hidden="true" />
              <h2 className={styles.prototypeTitle}>But first, a selfie</h2>
            </div>
          ) : project.showcaseVideo ? (
            <div className={styles.prototypeLabel}>
              <span className={styles.prototypeLine} aria-hidden="true" />
              <h2 className={styles.prototypeTitle}>Take a look at the result</h2>
            </div>
          ) : (
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelNum}>—</span>
              <span>Visuals</span>
            </div>
          )}
          {project.showcaseImage && !project.prototype ? (
            // Still image — render at its own aspect ratio (no 16:9 crop)
            <Image
              src={project.showcaseImage}
              alt={`${project.title} — team`}
              width={1600}
              height={1200}
              sizes="100vw"
              className={styles.showcaseImg}
            />
          ) : project.showcaseVideo && !project.prototype ? (
            // Showcase video — smaller centered box, whole frame visible (no crop)
            <div className={styles.videoBlockSmall}>
              <ShowcaseVideo
                src={project.showcaseVideo}
                title={`${project.title} — result walkthrough`}
              />
            </div>
          ) : (
            <div
              className={
                project.prototype && project.prototypeMobile
                  ? styles.phoneBlock
                  : styles.videoBlock
              }
            >
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
          )}
        </section>

        {/* Highlights — 3-up text cards (e.g. "What Success Looks Like") */}
        {hasHighlights && (
          <section className={styles.highlights}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelNum}>—</span>
              <span>{project.highlightsTitle ?? 'Highlights'}</span>
            </div>
            <div className={styles.highlightsGrid}>
              {project.highlights!.map((item, index) => (
                <article key={index} className={styles.highlightCard}>
                  <span className={styles.highlightNum}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightText}>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Generic sections — alternating image/text blocks (workflow, etc.) */}
        {hasSections &&
          project.sections!.map((section, index) => {
            // Auto-alternate: even → image right, odd → image left. `layout` overrides.
            const imageLeft = section.layout
              ? section.layout === 'imageLeft'
              : index % 2 === 1
            const gridClass = imageLeft ? styles.rebrandGrid : styles.identityGrid
            const text = (
              <div className={styles.paletteInfo}>
                <span className={styles.cardLabel}>{section.label}</span>
                <p className={styles.paletteDesc}>{section.note}</p>
              </div>
            )
            const image = (section.video || section.image) && (
              <div
                className={`${styles.paletteImage} ${
                  section.video ? styles.mediaVideoWell : ''
                }`}
              >
                {section.video ? (
                  <video
                    className={styles.sectionVideo}
                    src={section.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={section.image!}
                    alt={`${project.title} — ${section.title}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                )}
              </div>
            )
            const hasPairAfter = project.imagePairs?.some(
              (pair) => pair.afterSection === section.title
            )
            return (
              <Fragment key={index}>
                <section
                  className={`${styles.identity} ${
                    hasPairAfter ? styles.identityTightBottom : ''
                  }`}
                >
                  <div className={styles.identityHead}>
                    <span className={styles.identityIndex}>
                      {String(index + 4).padStart(2, '0')}
                    </span>
                    <h2 className={styles.identityTitle}>{section.title}</h2>
                  </div>
                  {image ? (
                    <div className={gridClass}>
                      {imageLeft ? (
                        <>
                          {image}
                          {text}
                        </>
                      ) : (
                        <>
                          {text}
                          {image}
                        </>
                      )}
                    </div>
                  ) : (
                    <p className={styles.storyText}>{section.note}</p>
                  )}
                </section>
                {/* Pairs anchored to render right after this section */}
                {project.imagePairs
                  ?.filter((pair) => pair.afterSection === section.title)
                  .map((pair, i) => renderImagePair(pair, `pair-${index}-${i}`))}
              </Fragment>
            )
          })}

        {/* Image pairs without an anchor — rendered after all sections */}
        {project.imagePairs
          ?.filter((pair) => !isAnchored(pair))
          .map((pair, index) => renderImagePair(pair, `pair-end-${index}`))}

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
                <div
                  className={`${styles.paletteImage} ${
                    project.paletteImageContain ? styles.paletteImageBare : ''
                  }`}
                >
                  <Image
                    src={project.paletteImage}
                    alt={`${project.title} — colour palette`}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{
                      objectFit: project.paletteImageContain ? 'contain' : 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Typography — font specimens (image placeholders) + title & description.
            A single font lays out image-left / text-right; multiple fonts use cards. */}
        {hasFonts &&
          (project.fonts!.length === 1 ? (
            <section className={styles.fonts}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelNum}>—</span>
                <span>Typography</span>
              </div>
              <div className={styles.fontSoloGrid}>
                <div className={styles.fontImage}>
                  {project.fonts![0].image ? (
                    <Image
                      src={project.fonts![0].image!}
                      alt={`${project.title} — ${project.fonts![0].name} specimen`}
                      fill
                      sizes="(max-width: 900px) 100vw, 60vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <div className={styles.fontPlaceholder}>
                      <span className={styles.fontPlaceholderGlyph}>Aa</span>
                    </div>
                  )}
                </div>
                <div className={styles.paletteInfo}>
                  <div className={styles.fontHead}>
                    <h3 className={styles.fontName}>{project.fonts![0].name}</h3>
                    <span className={styles.fontTag}>Font</span>
                  </div>
                  <p className={styles.fontDesc}>{project.fonts![0].description}</p>
                </div>
              </div>
            </section>
          ) : (
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
          ))}

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

        {/* Tools — fav-stack style: big centered icons + names */}
        <section className={styles.stack}>
          <span className={styles.stackLabel}>Tools & Technologies</span>
          <div className={styles.stackGrid}>
            {project.tools.map((tool, index) => {
              const icon = TOOL_ICONS[tool]
              return (
                <Fragment key={index}>
                  {index > 0 && <span className={styles.stackPlus}>+</span>}
                  <div className={styles.stackItem}>
                    {icon && (
                      <img
                        src={icon}
                        alt={tool}
                        className={styles.stackIcon}
                        width={64}
                        height={64}
                        loading="lazy"
                      />
                    )}
                    <span className={styles.stackName}>{tool}</span>
                  </div>
                </Fragment>
              )
            })}
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
