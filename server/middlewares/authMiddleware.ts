import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Clave secreta para JWT (debería estar en .env)
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

/**
 * Interfaz que extiende Request para incluir el usuario decodificado del token
 */
export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Middleware que verifica el token JWT
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Obtiene el token del encabezado Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    return;
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};
