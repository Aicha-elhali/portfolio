/**
 * Message Routes
 * API-Routen für Kontaktformular-Nachrichten
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import express, { Request, Response } from 'express';
import Message from '../models/Message';

const router = express.Router();

// GET - Alle Nachrichten abrufen (für Admin-Zwecke)
router.get('/', async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST - Neue Nachricht erstellen (Kontaktformular absenden)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Validierung
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null,
        }
      });
    }

    const newMessage = new Message({ name, email, message });
    const savedMessage = await newMessage.save();
    
    res.status(201).json({ 
      message: 'Message sent successfully',
      data: savedMessage 
    });
  } catch (error: any) {
    // Mongoose Validierungsfehler
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE - Nachricht löschen
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
