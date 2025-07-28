import express from 'express';
import { login } from '../controllers/authController.js';
import { verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
// Ruta para iniciar sesión
router.post('/login', login);
// Ruta para verificar el token
router.get('/verify', authMiddleware, verifyToken);
export default router;
