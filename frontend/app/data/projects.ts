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

// A 3-up grid of text cards (e.g. BMW's "What Success Looks Like").
export type Highlight = { title: string; text: string };

// A two-image block (HARIBO fonts-style): a large image beside a smaller one.
// `largeSide` sets which side the big image sits on (default 'left').
export type ImagePair = {
  label?: string;
  largeImage: string;
  smallImage: string;
  largeSide?: 'left' | 'right';
  // Render this pair right after the section with this exact title (mid-flow),
  // instead of after all sections. Falls back to the end if no title matches.
  afterSection?: string;
};

// A generic image + text block. `label` is the small eyebrow, `title` the big
// heading. Layout alternates automatically; set `layout` to override.
export type ProjectSection = {
  label: string;
  title: string;
  note: string;
  // Provide either an image or a video for the block's media side.
  image?: string;
  video?: string;
  layout?: 'imageLeft' | 'imageRight';
};

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
  // Set true when the prototype is a phone/iPhone (portrait) flow — renders it in a
  // centered, phone-shaped frame instead of the default 16:9 landscape one.
  prototypeMobile?: boolean;
  // Optional still image for the big Visuals slot (used instead of `video`).
  showcaseImage?: string;
  // Set true to drop the dark gradient overlay on the hero (for images that
  // already carry their own contrast/text).
  heroNoScrim?: boolean;
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
  // Two-image blocks (HARIBO fonts-style): a large image beside a smaller one.
  imagePairs?: ImagePair[];
  // Product summary: description (left) + image (right)
  productNote?: string;
  productImage?: string;
  // Rebrand: a big image (left) + a description (right) — mirrored layout for asymmetry
  rebrandNote?: string;
  rebrandImage?: string;
  // Optional "Typography" block — font specimens shown as images (placeholder until added)
  fonts?: Font[];
  // Optional 3-up text-card grid (with its own section title)
  highlightsTitle?: string;
  highlights?: Highlight[];
  // Optional sequence of generic image/text blocks (alternating layout)
  sections?: ProjectSection[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: 'bmw',
    title: 'BMW',
    year: '2026',
    services: 'AI · HMI',
    description: 'An AI pipeline that turns BMW Figma frames into working UI prototypes for the car display, fast, consistent and on brand.',
    image: '/images/fluid-prototyping.jpg',
    showcaseImage: '/images/projects/group_photo.jpg',
    semester: 'SS 2026',
    duration: '1 semester',
    context:
      'Fluid Prototyping is a team project exploring how AI can accelerate HMI design at BMW. The goal was to ==transform BMW design resources and Figma frames into working UI prototypes, quickly and consistently==, so that designers can test ideas directly on the car display rather than waiting on engineering. It sits at the intersection of automotive interface design, design systems and generative AI.',
    problem:
      '==“How might we enable designers with no coding experience to test their ideas efficiently on the car itself, while ensuring a result that stays true to the brand?”== Designers can mock up screens in Figma, but turning them into functional prototypes that run on the car display means translating design into code by hand. That is slow, repetitive every sprint, and easy to drift away from BMW’s strict HMI guidelines around colour, contrast, typography, interaction zones and safety.',
    solution:
      'A token pipeline closes that gap: a designer selects a Figma frame and runs the pipeline. A Token Extractor parses the design tokens (colour, type, spacing, radius), the Claude API classifies the content and applies BMW’s design guidelines automatically, and ==the system outputs a functional prototype with the correct structure and styling==, ready to test on the display. The human keeps creative control (wireframing, prompting, evaluating, safeguarding brand consistency) while the AI handles the repetitive transformation and generates variations, making prototyping faster, less manual and scalable across the team.',
    tools: ['Figma', 'Claude', 'React', 'Node.js', 'Git'],
    gallery: ['/images/fluid-prototyping.jpg'],
    highlightsTitle: 'What Success Looks Like',
    highlights: [
      {
        title: 'Faster Prototyping',
        text: 'Speed up ideation by generating functional prototypes directly from Figma frames.',
      },
      {
        title: 'Less Manual Work',
        text: 'Reduce repetitive design to code translation tasks across every sprint cycle.',
      },
      {
        title: 'Scalable Process',
        text: 'Build a reliable, consistent pipeline that any designer on the team can run.',
      },
    ],
    sections: [
      {
        label: 'Step 01',
        title: 'Build the Design System',
        note: 'The designer creates the library in their agent of choice by dropping a screenshot, pasting a Figma URL, or using an existing one like the BMW HMI Library. Colours, typography and guidelines all live in one place.',
        video: '/images/projects/design.mp4',
      },
      {
        label: 'Step 02',
        title: 'Design in Figma',
        note: 'Wireframes are built in Figma desktop, no new tools, just the familiar environment. Each frame is structured to reference the design system from step one.',
        image: '/images/projects/wireframes_bmw.jpg',
      },
      {
        label: 'Step 03',
        title: 'Generate with the Plugin',
        note: 'The Figma plugin sends the frame tree to the agent. Claude renders it as HTML using only library variables, so the output stays on brand by construction.',
        image: '/images/projects/plugin.jpg',
      },
      {
        label: 'Step 04',
        title: 'Preview & Test',
        note: 'The HTML runs directly in the browser with no build step. The designer can click through the full flow and try it on the car display.',
        image: '/images/projects/pretest.jpg',
      },
      {
        label: 'Step 05',
        title: 'Iterate in Minutes',
        note: 'Edit the wireframe and regenerate, or just chat with your agent of choice: “make the card bigger.” The library sets the constraints, so every iteration stays consistent.',
        image: '/images/projects/iteration.jpg',
      },
      {
        label: 'Behind the Scenes',
        title: 'Human and AI Collaboration',
        note: 'The human keeps creative control: wireframing, writing prompts, evaluating results and safeguarding BMW brand consistency. The AI handles the repetitive work: transforming wireframes into UI, applying design guidelines automatically, and generating variations.',
        image: '/images/projects/human_ai.jpg',
      },
      {
        label: 'Architecture',
        title: 'Agentic Setup',
        note: 'Under the hood, a chain of specialised agents for planning, frontend and backend generation, review and fix collaborate to turn a single frame into clean prototype source code.',
        image: '/images/projects/agentic_setup.jpg',
      },
      {
        label: 'First Outcome',
        title: 'Testing the Agent',
        note: 'One of our first outcomes, focused less on how the result looked and more on what the agent actually did. We wanted to see how reliably the APIs connect, how well the design system gets used, and whether the agent stays inside the system or starts to reinvent and invent its own components.',
        image: '/images/projects/testing.jpg',
      },
      {
        label: 'Ongoing',
        title: 'Polishing & Testing',
        note: 'The project is still ongoing. We keep testing prototypes on the platform and training the agent, refining the pipeline and the BMW HMI library with every loop.',
      },
    ],
  },
  {
    slug: 'social-media-agents',
    title: 'Social Media Agents',
    year: '2025/26',
    services: 'Agents · N8N',
    description: 'A Social Media Post Agent that takes Atolls from a Slack message to a published LinkedIn post, with a human approving everything that goes live.',
    image: '/images/projects/atoll_landing.jpg',
    heroNoScrim: true,
    video: '/images/projects/atolls_video.mp4',
    semester: 'WS 2025/26',
    duration: '1 semester',
    context:
      'Social Media Post Agent is a team project built for Atolls, formerly known as Global Savings Group. Atolls is a privately held international commerce content company working in online savings, cashback and affiliate marketing, combining multiple savings portals across more than 20 countries. It builds and runs digital shopping destinations that help millions of consumers make smart spending decisions. A company at that scale posts constantly on LinkedIn, so the goal of this project was to ==take content creation all the way from a request in Slack to a published LinkedIn post automatically==, while keeping a human in control of what actually goes live.',
    problem:
      '==Creating content is easy. Scaling it is not.== Atolls posts many different kinds of content, from recruitment to product showcases to employee engagement, and each one costs time, has to stay consistent with the brand voice, and needs sign off before it goes out. Done by hand every week the workflow is slow and repetitive, and one rushed post can easily end up off brand.',
    solution:
      'A content automation system that runs from Slack to LinkedIn. A team member triggers a request in Slack, an intelligent router sends it to the right specialised agent (recruitment, product showcase or employee engagement), and the agent drafts a post in a structured, predictable format. The draft comes back into Slack for human review, where it can be approved, edited, regenerated or rejected, and only approved posts get published. The system is built on n8n with Airtable as a single source of truth, and it separates content generation from the approval process so it stays maintainable and reliable. The result: ==repetition is automated while strategy stays human==, with faster production, consistent branding, and a setup that scales across multiple post types in parallel.',
    tools: ['n8n', 'Slack', 'Airtable', 'LinkedIn'],
    gallery: ['/images/atolls.jpg'],
    highlightsTitle: 'What This Delivers',
    highlights: [
      {
        title: 'Modular Workflows',
        text: 'Each post type is isolated, so the system stays easy to maintain and extend.',
      },
      {
        title: 'Structured Outputs',
        text: 'Posts are generated in a JSON format that is predictable, parseable and reliable.',
      },
      {
        title: 'Human in the Loop',
        text: 'Approval is not optional, it is built into the architecture.',
      },
    ],
    // NOTE: image paths are placeholders — export the deck screenshots into
    // /public/images/projects/atolls/ and the blocks will appear automatically.
    sections: [
      {
        label: 'Routing',
        title: 'Intelligent Routing',
        note: 'An AI router reads each request and sends it to the right specialised agent: recruitment, product showcase or employee engagement. Each agent keeps its own memory, so it holds the tone and context of its content type.',
        image: '/images/projects/atolls_routing.jpg',
        layout: 'imageLeft',
      },
      {
        label: 'Architecture',
        title: 'Two-Workflow Separation',
        note: 'Content generation and the approval process run as two separate workflows. Keeping them apart avoids fragile, spaghetti style automation and makes the whole system easier to debug and maintain.',
        image: '/images/projects/atolls_workflow.jpg',
        layout: 'imageRight',
      },
      {
        label: 'Data',
        title: 'Airtable as a Single Source',
        note: 'Airtable holds every post and its status in one place, from pending text to published. It acts as the single source of truth that both workflows read from and write to.',
        image: '/images/projects/airtable.jpg',
        layout: 'imageLeft',
      },
      {
        label: 'Impact',
        title: 'Repetition Automated, Strategy Stays Human',
        note: 'One flow replaces multiple handovers for faster production. A templated structure with human approval keeps the brand consistent. The setup scales across post types in parallel, and the AI generates while people decide.',
      },
      {
        label: 'Handover',
        title: 'Delivered & Handed Over',
        note: 'The system was finished and handed over to Atolls, where it now runs in production. After handover the agents keep learning from new content, and the next unlock is extending the system to more channels and post types.',
      },
    ],
  },
  {
    slug: 'moosburg',
    title: 'Moosburg',
    year: '2025/26',
    services: 'Concept · Research',
    description: 'Bringing Moosburg’s WWII history into the city space — barrier-free, for every generation and without an app.',
    image: '/images/projects/landing_moosburg.jpg',
    prototype: 'https://www.figma.com/proto/HLSnM72ozwVSgzZgtxMIwb/Moosburg-Prototype?node-id=1221-1395&p=f&t=i2lkoN1OjzqoQmdD-0&scaling=scale-down-width&content-scaling=fixed&page-id=535%3A985&starting-point-node-id=1221%3A1395&hide-ui=1',
    prototypeMobile: true,
    semester: 'WS 2025/26',
    duration: 'Ongoing',
    context:
      'Moosburg was home to Stalag VII-A, one of the largest German prisoner-of-war camps of the Second World War, where tens of thousands of POWs were held. As the last eyewitnesses pass away, ==that memory is slowly disappearing from the city==. The history still survives, across a museum, archives and guided tours, but those offerings are scattered and hard to find, so most residents and visitors walk straight past it without ever knowing it is there.',
    problem:
      '==“How might we bring Moosburg’s history into the city space, barrier-free and without an app, for all generations, as a central access point to the existing historical offerings and a tool that works for guided city tours?”== Four obstacles shaped the brief: information is fragmented across institutions; the community resists purely digital solutions; the history runs on a pull model where people have to actively go looking for it (Holschuld) instead of having it brought to them (Bringschuld); and in everyday public space it simply lacks visibility.',
    solution:
      'An analog-first anchor in the streetscape. A physical board (Tafel) placed at each historic site is the anchor; a QR code on it is the key that opens a bundled digital layer, audio diaries, visuals and archive material, ==without forcing anyone to install an app==. A compartment holds the printed “Echoes” brochure for those who prefer paper, and the same anchor doubles as a working tool for city guides and the museum. Built on participation, it invites residents to add their own memories, keeping the project alive and independent of any single institution.',
    tools: ['Figma', 'Illustrator', 'After Effects'],
    gallery: ['/images/moosburg.jpg'],
    highlightsTitle: 'The Challenge',
    highlights: [
      {
        title: 'Fragmented Information',
        text: 'History is split across the museum, archives and tours, with no single place that ties the offerings together.',
      },
      {
        title: 'Resistance to Digital-Only',
        text: 'The community pushes back on purely digital solutions, so the answer cannot live on a screen alone.',
      },
      {
        title: 'Pull, Not Push',
        text: 'Today people must actively seek out the history (Holschuld); it is never brought to them (Bringschuld).',
      },
      {
        title: 'Lack of Visibility',
        text: 'In everyday public space the history is effectively invisible, easy to walk past without noticing.',
      },
    ],
    sections: [
      {
        label: 'Research',
        title: 'Grounding the Concept',
        note: 'The concept is built on field research: interviews with residents and stakeholders, user journeys, “How Might We” framing and analyses of the existing offerings, and more. That work surfaced the four obstacles and shaped every decision that followed.',
        image: '/images/projects/research.jpg',
        layout: 'imageLeft',
      },
      {
        label: 'The Anchor',
        title: 'A Board in the Streetscape',
        note: 'A physical board placed at each historic site is the anchor of the whole system. It needs no power, no login and no app, it simply stands in public space and makes the history impossible to walk past.',
        image: '/images/projects/tabel.jpg',
        layout: 'imageRight',
      },
      {
        label: 'The Key',
        title: 'The QR Code as Key',
        note: 'A QR code on the board is the key. One scan opens the bundled digital layer in any phone’s browser, no install and no account, so the threshold to engage stays as low as possible.',
        image: '/images/projects/qr_key.jpg',
        layout: 'imageLeft',
      },
      {
        label: 'Content',
        title: 'Audio Diaries & Visuals',
        note: 'Behind the code sit audio diaries and visuals: first-person accounts and archive imagery that let the POW history be heard and seen, not just read off a sign.',
        image: '/images/projects/audio_screen.jpg',
        layout: 'imageRight',
      },
      {
        label: 'One Entry Point',
        title: 'Bundling the Offerings',
        note: 'Museum, archive and guided tours already exist but live apart. The system bundles them into a single entry point, so finding one means finding all of them.',
      },
      {
        label: 'For Practitioners',
        title: 'A Tool for Guides & the Museum',
        note: 'The same anchor works as a tool for city guides and the museum: a fixed, reliable stop on a tour and a shared reference everyone can point to on the ground.',
      },
      {
        label: 'Echoes',
        title: 'Remembrance Through Participation',
        note: 'The “Echoes” brochure is built on participation: residents are invited to add their own memories and stories, so the record keeps growing instead of fading with its last witnesses.',
      },
      {
        label: 'Independence',
        title: 'Staying Independent',
        note: 'Designed to clear institutional hurdles, the system stays independent of any single organisation, analog at its core, so it keeps working regardless of who maintains the digital layer.',
      },
    ],
    imagePairs: [
      {
        label: 'The Brochure Compartment',
        largeImage: '/images/projects/broschure_green.jpg',
        smallImage: '/images/projects/broschure_red.jpg',
        largeSide: 'left',
        afterSection: 'A Tool for Guides & the Museum',
      },
      {
        label: 'Mockup',
        largeImage: '/images/projects/mock_up_table.jpg',
        smallImage: '/images/projects/mockup_irl.jpg',
        largeSide: 'right',
        afterSection: 'A Tool for Guides & the Museum',
      },
    ],
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
