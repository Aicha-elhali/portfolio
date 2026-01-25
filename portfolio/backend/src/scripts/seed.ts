/**
 * Seed Script
 * Populates the database with sample projects
 * Author: Aicha El Hali
 * Web Technologies WS 2025/26
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

dotenv.config();

const projects = [
  {
    title: 'HARIBO',
    slug: 'haribo',
    year: '2025',
    services: 'Re-design · Brand',
    description: 'Redesign of a candy company, turning it into a 80`s supplement provider.',
    image: '/images/haribo.jpg',
    live: '#',
    order: 1,
  },
  {
    title: 'Social Media Agents',
    slug: 'social-media-agents',
    year: '2025/26',
    services: 'Agents · N8N',
    description: 'Automated social media content for the world´s largest shopping engagement platform.',
    image: '/images/atolls.jpg',
    live: '#',
    order: 2,
  },
  {
    title: 'StyleMate',
    slug: 'stylemate',
    year: '2024',
    services: 'Chatbot · UI',
    description: 'A chatbot that specializes on the users personal style for recommendation',
    image: '/images/stylemate.jpg',
    live: '#',
    order: 3,
  },
  {
    title: 'Spacey',
    slug: 'spacey',
    year: '2025',
    services: 'Product · UI',
    description: 'What to do with empty spaces in Munich? Check out the ideas and the prototype',
    image: '/images/spacey.jpg',
    live: '#',
    order: 4,
  },
  {
    title: 'Moosburg',
    slug: 'moosburg',
    year: '2025/26',
    services: 'Prototype · Research',
    description: 'A Prototype for the city Moosburg about historcial sites for the POW',
    image: '/images/moosburg.jpg',
    live: '#',
    order: 5,
  },
  {
    title: 'Ebay',
    slug: 'ebay',
    year: '2024',
    services: 'Product · UI',
    description: 'A redesign of the Ebay product site for a better user experience.',
    image: '/images/ebay.jpg',
    live: '#',
    order: 6,
  },
  {
    title: 'Hangman',
    slug: 'hangman',
    year: '2025',
    services: 'React · Playful',
    description: 'Check out my hangman game i made the day it was due..',
    image: '/images/hangman.jpg',
    live: '#',
    order: 7,
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
