/**
 * Projects — single source of truth
 * Used by both the projects overview (/projects) and the detail pages (/projects/[slug]).
 * Author: Aicha El Hali
 *
 * NOTE (placeholders to edit yourself):
 *  - `semester` / `duration` are best-effort guesses, not confirmed data.
 *  - HARIBO's `typeface` / `palette` are sample values — replace with the real ones.
 */

export type PaletteColor = { name: string; hex: string };
export type Typeface = { name: string; styles: string; sample?: string };
export type Font = { name: string; description: string; image?: string };

export type Project = {
  slug: string;
  title: string;
  year: string;
  services: string;
  description: string;
  // Provide either an image or a video for the overview tile.
  image: string;
  video?: string;
  // Optional Figma prototype — paste the prototype's "Share" URL; embedded in the Visuals section.
  prototype?: string;
  // Overview meta (shown beside the picture). Topic is derived from `services`.
  semester: string;
  duration: string;
  // Detail page story
  context: string;
  problem: string;
  solution: string;
  tools: string[];
  gallery: string[];
  // Optional "Visual Identity" block (Typeface + Palette)
  typeface?: Typeface;
  palette?: PaletteColor[];
  // Visual Identity: a description + a big palette image
  paletteNote?: string;
  paletteImage?: string;
  // Logo: image (left) + description (right)
  logoNote?: string;
  logoImage?: string;
  // Mockup: image (left) + description (right)
  mockupNote?: string;
  mockupImage?: string;
  // Product summary: description (left) + image (right)
  productNote?: string;
  productImage?: string;
  // Rebrand: a big image (left) + a description (right) — mirrored layout for asymmetry
  rebrandNote?: string;
  rebrandImage?: string;
  // Optional "Typography" block — font specimens shown as images (placeholder until added)
  fonts?: Font[];
  link?: string;
};

export const projects: Project[] = [
  {
    // TODO: replace placeholder copy + add /images/bmw.jpg
    slug: 'bmw',
    title: 'BMW',
    year: '2025',
    services: 'Product · UI',
    description: 'TODO — one-line summary of the BMW project for the overview tile.',
    image: '/images/bmw.jpg',
    video: '/images/projects/intro_bmw.mp4',
    semester: 'SS 2025',
    duration: 'TODO',
    context: 'TODO — what the BMW project is and the brief behind it.',
    problem: 'TODO — the core challenge this project set out to solve.',
    solution: 'TODO — the approach and outcome.',
    tools: ['Figma'],
    gallery: ['/images/bmw.jpg'],
  },
  {
    slug: 'haribo',
    title: 'HARIBO',
    year: '2025',
    services: 'Re-design · Brand',
    description: 'Redesign of a candy company, turning it into an 80s supplement provider.',
    image: '/images/haribo.jpg',
    video: '/images/projects/pill.mp4',
    prototype: 'https://www.figma.com/proto/F9UyULUPknaSLhSGaHspLA/Untitled?node-id=29-131&t=J3T4M7D1qa3hqoil-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=29%3A131&show-proto-sidebar=1&hide-ui=1',
    semester: 'SS 2025',
    duration: '6 weeks',
    context:
      'HARIBO, the iconic candy brand known for its gummy bears, undergoes a radical transformation in this concept project. The redesign reimagines the brand as a premium 80s-inspired supplement provider, blending nostalgia with modern wellness trends. The project explores how a beloved confectionery brand could pivot to the health and fitness market while maintaining its playful essence.',
    problem:
      'The main challenge was to preserve the recognizable HARIBO brand identity while completely shifting its market positioning. How do you take a brand synonymous with sugary treats and make it credible in the health supplement space? The design needed to bridge the gap between indulgence and wellness.',
    solution:
      'The solution embraced the 80s aesthetic with bold neon colors, geometric patterns, and retro typography. The iconic HARIBO bear was reimagined as a muscular fitness mascot. Product packaging features vibrant gradients and chrome effects typical of 80s design, while maintaining the playful spirit that makes HARIBO beloved worldwide.',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    gallery: ['/images/font.jpg', '/images/haribo_products.jpg', '/images/palette.jpg'],
    // TODO: replace with the real typeface / hex values from your design file
    typeface: { name: 'Anton', styles: 'Display · Regular · Bold', sample: 'Aa' },
    palette: [
      { name: 'Orange Red', hex: '#FF4500' },
      { name: 'Blue', hex: '#0638D2' },
      { name: 'Cyan', hex: '#00B7A8' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    paletteNote:
      'A bold 80s-inspired palette — orange-red, electric blue and cyan set against pure black and white, capturing the retro, energetic spirit of the rebrand.',
    paletteImage: '/images/projects/palette.jpg',
    logoNote:
      'The reimagined HARIBO mark — the playful wordmark retooled with bold, retro-futuristic edges that signal the shift from candy aisle to 80s supplement shelf.',
    logoImage: '/images/projects/logo.jpg',
    mockupNote:
      'Brought to life across real-world touchpoints — packaging, labels and in-store presence — showing how the identity holds up once it leaves the screen.',
    mockupImage: '/images/projects/mockup.jpg',
    productNote:
      'The full product line at a glance — supplement tubs and packs unified by consistent typography, colour and tone across every SKU.',
    productImage: '/images/projects/product_summary.jpg',
    rebrandNote:
      'The full rebrand brings the concept together — packaging, mascot and 80s supplement positioning unified into a single, cohesive system that still feels unmistakably HARIBO.',
    rebrandImage: '/images/projects/rebrand.jpg',
    fonts: [
      {
        name: 'Orbitron',
        description: 'Display typeface — bold headlines and 80s impact.',
        image: '/images/projects/orbitron.jpg',
      },
      {
        name: 'Helvetica',
        description: 'Body typeface — clean and legible for long copy.',
        image: '/images/projects/helvetica.jpg',
      },
    ],
    link: 'https://www.figma.com/deck/YvAJxE97Wij40s5lMsDBxq/Haribo-retro?node-id=32-287&t=8F2jiEI3B8MlIbI8-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
  },
  {
    slug: 'social-media-agents',
    title: 'Social Media Agents',
    year: '2025/26',
    services: 'Agents · N8N',
    description: 'Automated social media content for the world\'s largest shopping engagement platform.',
    image: '/images/atolls.jpg',
    semester: 'WS 2025/26',
    duration: 'Ongoing',
    context: 'An innovative automation project that leverages AI agents to generate and manage social media content at scale.',
    problem: 'Creating consistent, engaging content across multiple platforms while maintaining brand voice.',
    solution: 'Developed a network of AI agents using N8N that collaborate to create, review, and publish content.',
    tools: ['N8N', 'OpenAI API', 'Python', 'Zapier'],
    gallery: ['/images/atolls.jpg'],
  },
  {
    slug: 'stylemate',
    title: 'StyleMate',
    year: '2024',
    services: 'Chatbot · UI',
    description: 'A chatbot that specializes on the user\'s personal style for recommendation.',
    image: '/images/stylemate.jpg',
    semester: 'SS 2024',
    duration: '4 weeks',
    context: 'StyleMate is an AI-powered fashion assistant that learns your personal style preferences.',
    problem: 'Understanding individual style preferences and providing personalized recommendations.',
    solution: 'Created an intuitive chatbot interface with a style quiz and visual preference learning.',
    tools: ['React', 'Node.js', 'OpenAI API', 'Figma'],
    gallery: ['/images/stylemate.jpg'],
  },
  {
    slug: 'spacey',
    title: 'Spacey',
    year: '2025',
    services: 'Product · UI',
    description: 'What to do with empty spaces in Munich? Check out the ideas and the prototype.',
    image: '/images/spacey.jpg',
    semester: 'SS 2025',
    duration: '8 weeks',
    context: 'Spacey addresses the urban challenge of unused spaces in Munich.',
    problem: 'Connecting space owners with creative individuals and businesses looking for temporary venues.',
    solution: 'A platform that makes discovering and booking temporary spaces simple and accessible.',
    tools: ['Figma', 'React', 'Next.js', 'Tailwind CSS'],
    gallery: ['/images/spacey.jpg'],
  },
  {
    slug: 'moosburg',
    title: 'Moosburg',
    year: '2025/26',
    services: 'Prototype · Research',
    description: 'A prototype for the city Moosburg about historical sites for the POW.',
    image: '/images/moosburg.jpg',
    semester: 'WS 2025/26',
    duration: 'Ongoing',
    context: 'A research-driven prototype exploring the historical significance of POW sites in Moosburg.',
    problem: 'Presenting sensitive historical information in an accessible and respectful manner.',
    solution: 'An interactive digital experience that guides users through historical locations.',
    tools: ['Figma', 'Adobe XD', 'After Effects'],
    gallery: ['/images/moosburg.jpg'],
  },
  {
    slug: 'hangman',
    title: 'Hangman',
    year: '2025',
    services: 'React · Playful',
    description: 'Check out my hangman game I made the day it was due.',
    image: '/images/hangman.jpg',
    semester: 'SS 2025',
    duration: '1 day',
    context: 'A fun, interactive Hangman game built with React.',
    problem: 'Creating an engaging game experience with smooth animations under time pressure.',
    solution: 'A minimalist but polished game with keyboard support and visual feedback.',
    tools: ['React', 'TypeScript', 'CSS Animations'],
    gallery: ['/images/hangman.jpg'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
