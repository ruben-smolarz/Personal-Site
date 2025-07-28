import express from 'express';
import { 
  getVisitsStats, 
  getBasicVisitsStats, 
  getPageVisitsStats, 
  getTimeVisitsStats, 
  getTechVisitsStats,
  getGeoVisitsStats,
  generateTestData
} from '../controllers/visitsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para obtener todas las estadísticas
router.get('/', authMiddleware, getVisitsStats);

// Ruta para obtener estadísticas básicas
router.get('/basic', authMiddleware, getBasicVisitsStats);

// Ruta para obtener las estadísticas de la página
router.get('/pages', authMiddleware, getPageVisitsStats);

// Ruta para obtener las estadísticas de la página
router.get('/time', authMiddleware, getTimeVisitsStats);

// Ruta para obtener estadísticas del navegador y del sistema operativo
router.get('/tech', authMiddleware, getTechVisitsStats);

// Ruta para obtener estadísticas geográficas
router.get('/geo', authMiddleware, getGeoVisitsStats);

// Ruta para generar datos de prueba
router.post('/generate-test-data', authMiddleware, generateTestData);

export default router;