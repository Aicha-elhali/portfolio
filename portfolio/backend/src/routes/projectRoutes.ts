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
    const projects = await Project.find().sort({ createdAt: -1 });
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
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
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
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
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
