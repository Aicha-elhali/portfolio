/**
 * Message Routes
 * API-Routen für Kontaktformular-Nachrichten
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import express, { Request, Response } from 'express';
import Message from '../models/Message';

const router = express.Router();

// GET all messages (für Admin-Zwecke)
router.get('/', async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST create new message (Kontaktformular absenden)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Validierung
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Alle Felder sind erforderlich',
        errors: {
          name: !name ? 'Name ist erforderlich' : null,
          email: !email ? 'E-Mail ist erforderlich' : null,
          message: !message ? 'Nachricht ist erforderlich' : null,
        }
      });
    }

    const newMessage = new Message({ name, email, message });
    const savedMessage = await newMessage.save();
    
    res.status(201).json({ 
      message: 'Nachricht erfolgreich gesendet',
      data: savedMessage 
    });
  } catch (error: any) {
    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validierungsfehler', errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE message by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Nachricht nicht gefunden' });
    }
    res.json({ message: 'Nachricht erfolgreich gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
