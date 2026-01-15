/**
 * Seed Script
 * Befüllt die Datenbank mit Beispiel-Projekten
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

dotenv.config();

const projects = [
  {
    title: 'ATLAS',
    slug: 'atlas',
    year: '2023',
    services: 'Design · Development',
    description: 'Designing a concept lunar base & website for the European Space Agency.',
    image: '/images/projects/atlas-large.jpg',
    live: 'https://atlas-grg19.webflow.io',
  },
  {
    title: 'NEON',
    slug: 'neon',
    year: '2022',
    services: 'Brand · UI',
    description: 'A visual identity and landing experience for a creative studio.',
    image: '/images/projects/neon-large.jpg',
    live: '#',
  },
  {
    title: 'FOLIO',
    slug: 'folio',
    year: '2024',
    services: 'Product · Web',
    description: 'A minimal portfolio template focused on content and performance.',
    image: '/images/projects/folio-large.jpg',
    live: '#',
  },
  {
    title: 'MINIMAL',
    slug: 'minimal',
    year: '2025',
    services: 'Brand · Design',
    description: 'A minimal editorial site concept focusing on typographic rhythm and negative space.',
    image: '/images/projects/minimal-large.jpg',
    live: '#',
  },
  {
    title: 'PULSE',
    slug: 'pulse',
    year: '2021',
    services: 'Motion · Web',
    description: 'Interactive hero animations and micro-interactions for a music label.',
    image: '/images/projects/pulse-large.jpg',
    live: '#',
  },
  {
    title: 'ARC',
    slug: 'arc',
    year: '2020',
    services: 'Product · UI',
    description: 'A lightweight product dashboard with focus on data legibility.',
    image: '/images/projects/arc-large.jpg',
    live: '#',
  },
  {
    title: 'ORBIT',
    slug: 'orbit',
    year: '2024',
    services: 'Design · Strategy',
    description: 'Brand identity and website for a futuristic events platform.',
    image: '/images/projects/orbit-large.jpg',
    live: '#',
  },
];

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('✅ Seeded', projects.length, 'projects');

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
