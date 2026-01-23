/**
 * Server Entry Point
 * Express-Server mit MongoDB-Anbindung
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './lib/db';
import projectRoutes from './routes/projectRoutes';
import messageRoutes from './routes/messageRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-Konfiguration
app.use(cors());
app.use(express.json());

// API-Routen
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

// Statusprüfung
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running 🚀' });
});

// Globaler Fehlerbehandler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Server starten
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start();
