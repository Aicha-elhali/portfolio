/**
 * Auth Middleware
 * JWT Verification Middleware zum Schutz der Routes
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Erweiterter Request-Typ mit User
export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
}

// JWT Secret aus Umgebungsvariablen
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware zur JWT-Verifizierung
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Token aus Header extrahieren
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Token verifizieren
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Prüfen ob User noch existiert (wichtig für gelöschte Accounts)
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    // User an Request anhängen
    req.user = user;
    req.userId = decoded.userId;

    next();
  } catch (error: any) {
    // Token abgelaufen
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please login again.' });
    }
    // Ungültiger Token
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

// Optionale Auth Middleware (erlaubt auch ohne Token, aber fügt User hinzu wenn vorhanden)
export const optionalAuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select('-password');
    
    if (user) {
      req.user = user;
      req.userId = decoded.userId;
    }

    next();
  } catch (error) {
    // Bei Fehlern einfach ohne User weitermachen
    next();
  }
};
