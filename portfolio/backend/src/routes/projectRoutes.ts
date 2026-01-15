/**
 * Project Routes
 * API-Routen für CRUD-Operationen auf Projekte
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import express, { Request, Response } from 'express';
import Project from '../models/Project';

const router = express.Router();

// GET - Alle Projekte abrufen
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET - Einzelnes Projekt nach Slug abrufen
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

// POST - Neues Projekt erstellen
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, slug, year, services, description, image, live } = req.body;

    // Validierung
    if (!title || !slug || !year || !services || !description) {
      return res.status(400).json({ 
        message: 'Required fields are missing',
        errors: {
          title: !title ? 'Title is required' : null,
          slug: !slug ? 'Slug is required' : null,
          year: !year ? 'Year is required' : null,
          services: !services ? 'Services are required' : null,
          description: !description ? 'Description is required' : null,
        }
      });
    }

    const project = new Project({ title, slug, year, services, description, image, live });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error: any) {
    // Mongoose Validierungsfehler
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation error', errors });
    }
    // Duplikatfehler (Slug existiert bereits)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A project with this slug already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT - Projekt aktualisieren
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error: any) {
    // Mongoose Validierungsfehler
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation error', errors });
    }
    // Ungültige ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE - Projekt löschen
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
