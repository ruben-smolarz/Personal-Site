import { Request, Response } from 'express';
import { getVisitsData } from '../middlewares/visitsTracker.js';
import geoip from 'geoip-lite';
import { visitsTracker } from '../middlewares/visitsTracker.js';

/**
 * Obtiene las estadísticas completas de las visitas
 */
export const getVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json(visitsData);
  } catch (error) {
    console.error('Error al obtener las estadísticas de visitas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas de visitas' });
  }
};

/**
 * Obtiene solo las estadísticas básicas (total de visitas y visitantes únicos)
 */
export const getBasicVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json({
      totalVisits: visitsData.totalVisits,
      uniqueVisitors: visitsData.uniqueVisitors,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas básicas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas básicas' });
  }
};

/**
 * Obtiene las estadísticas de las páginas más visitadas
 */
export const getPageVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    
    // Ordena las páginas por número de visitas en orden descendente
    const sortedPages = Object.entries(visitsData.paths)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [path, count]) => {
        acc[path] = count;
        return acc;
      }, {} as Record<string, number>);
    
    res.status(200).json({
      pages: sortedPages,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas de páginas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas de páginas' });
  }
};

/**
 * Obtiene las estadísticas temporales (por hora y por día)
 */
export const getTimeVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json({
      hourlyStats: visitsData.hourlyStats,
      dailyStats: visitsData.dailyStats,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas temporales:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas temporales' });
  }
};

/**
 * Obtiene las estadísticas de navegadores y sistemas operativos
 */
export const getTechVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json({
      browserStats: visitsData.browserStats,
      osStats: visitsData.osStats,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas técnicas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas técnicas' });
  }
};

/**
 * Obtiene las estadísticas geográficas (por país)
 */
export const getGeoVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    
    // Ordena los países por número de visitas en orden descendente
    const sortedCountries = Object.entries(visitsData.countryStats)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [country, count]) => {
        acc[country] = count;
        return acc;
      }, {} as Record<string, number>);
    
    res.status(200).json({
      countryStats: sortedCountries,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas geográficas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas geográficas' });
  }
};

/**
 * Genera datos de prueba para verificar el funcionamiento
 */
export const generateTestData = (req: Request, res: Response): void => {
  try {
    // Simula varias solicitudes con diferentes rutas
    const simulateRequest = (path: string, country: string, userAgent: string) => {
      const mockReq = {
        path,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        headers: {
          'user-agent': userAgent
        }
      } as Request;
      
      const mockRes = {} as Response;
      const mockNext = () => {};
      
      // Sobrescribe temporalmente el método lookup de geoip para la prueba
      const originalLookup = geoip.lookup;
      geoip.lookup = () => ({
        country,
        region: 'Unknown',
        city: 'Unknown',
        ll: [0, 0],
        metro: 0,
        area: 0,
        eu: '0',
        timezone: 'Europe/Rome',
        range: [0, 0]
      });
      
      // Ejecuta el middleware con los datos simulados
      visitsTracker(mockReq, mockRes, mockNext);
      
      // Restaura el método lookup original
      geoip.lookup = originalLookup;
    };
    
    // Simula 10 visitas con datos diferentes
    simulateRequest('/', 'IT', 'Chrome/91.0.4472.124');
    simulateRequest('/about', 'US', 'Firefox/89.0');
    simulateRequest('/contact', 'FR', 'Safari/14.1.1');
    simulateRequest('/products', 'DE', 'Chrome/91.0.4472.124');
    simulateRequest('/blog', 'ES', 'Edge/91.0.864.59');
    simulateRequest('/', 'IT', 'Chrome/91.0 Mobile');
    simulateRequest('/about', 'GB', 'Safari Mobile/14.1.1');
    simulateRequest('/contact', 'JP', 'Chrome/91.0.4472.124');
    simulateRequest('/products', 'CN', 'Firefox/89.0');
    simulateRequest('/blog', 'BR', 'Chrome/91.0 Mobile');
    
    res.status(200).json({ 
      success: true, 
      message: 'Datos de prueba generados exitosamente. Ahora puedes verificar las estadísticas mediante los otros endpoints.' 
    });
  } catch (error) {
    console.error('Error al generar los datos de prueba:', error);
    res.status(500).json({ error: 'Error al generar los datos de prueba' });
  }
};
