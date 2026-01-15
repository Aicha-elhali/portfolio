/**
 * Project Routes
 * API-Routen für CRUD-Operationen auf Projekte
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import express, { Request, Response } from 'express';
import Project from '../models/Project';

const router = express.Router();

// GET all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET single project by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST create new project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, slug, year, services, description, image, live } = req.body;

    // Validierung
    if (!title || !slug || !year || !services || !description) {
      return res.status(400).json({ 
        message: 'Pflichtfelder fehlen',
        errors: {
          title: !title ? 'Titel ist erforderlich' : null,
          slug: !slug ? 'Slug ist erforderlich' : null,
          year: !year ? 'Jahr ist erforderlich' : null,
          services: !services ? 'Services sind erforderlich' : null,
          description: !description ? 'Beschreibung ist erforderlich' : null,
        }
      });
    }

    const project = new Project({ title, slug, year, services, description, image, live });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error: any) {
    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validierungsfehler', errors });
    }
    // Duplicate Key Error (slug already exists)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ein Projekt mit diesem Slug existiert bereits' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update project
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Projekt nicht gefunden' });
    }
    res.json(project);
  } catch (error: any) {
    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validierungsfehler', errors });
    }
    // Invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Ungültige Projekt-ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
