import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import geoip from 'geoip-lite';
// Para obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, '../data/visits.json');
/**
 * Lee los datos del archivo JSON
 */
const readVisitsData = () => {
    try {
        if (!fs.existsSync(DATA_FILE_PATH)) {
            const initialData = {
                totalVisits: 0,
                uniqueVisitors: 0,
                paths: {},
                sessions: {},
                hourlyStats: {},
                dailyStats: {},
                browserStats: {},
                osStats: {},
                countryStats: {},
                lastUpdated: new Date().toISOString()
            };
            fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
            return initialData;
        }
        const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error al leer los datos de visitas:', error);
        return {
            totalVisits: 0,
            uniqueVisitors: 0,
            paths: {},
            sessions: {},
            hourlyStats: {},
            dailyStats: {},
            browserStats: {},
            osStats: {},
            countryStats: {},
            lastUpdated: new Date().toISOString()
        };
    }
};
/**
 * Guarda los datos en el archivo JSON
 */
const saveVisitsData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error('Error al guardar los datos de visitas:', error);
    }
};
/**
 * Middleware para el seguimiento de las visitas
 */
export const visitsTracker = (req, res, next) => {
    // Ignora las solicitudes para archivos estáticos
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        next();
        return;
    }
    try {
        const visitsData = readVisitsData();
        const now = new Date();
        const hour = now.getHours().toString();
        const day = now.toISOString().split('T')[0];
        // Incrementa el contador total de visitas
        visitsData.totalVisits += 1;
        // Actualiza las estadísticas por ruta
        const pathName = req.path;
        visitsData.paths[pathName] = (visitsData.paths[pathName] || 0) + 1;
        // Actualiza las estadísticas por hora
        visitsData.hourlyStats[hour] = (visitsData.hourlyStats[hour] || 0) + 1;
        // Actualiza las estadísticas por día
        visitsData.dailyStats[day] = (visitsData.dailyStats[day] || 0) + 1;
        // Obtiene información sobre el navegador y el sistema operativo
        const userAgent = req.headers['user-agent'] || 'Desconocido';
        // Análisis simplificado de navegador y sistema operativo
        let browser = 'Desconocido';
        if (userAgent.includes('Firefox'))
            browser = 'Firefox';
        else if (userAgent.includes('Chrome'))
            browser = 'Chrome';
        else if (userAgent.includes('Safari'))
            browser = 'Safari';
        else if (userAgent.includes('Edge'))
            browser = 'Edge';
        else if (userAgent.includes('MSIE') || userAgent.includes('Trident'))
            browser = 'Internet Explorer';
        let os = 'Desconocido';
        if (userAgent.includes('Windows'))
            os = 'Windows';
        else if (userAgent.includes('Mac'))
            os = 'MacOS';
        else if (userAgent.includes('Linux'))
            os = 'Linux';
        else if (userAgent.includes('Android'))
            os = 'Android';
        else if (userAgent.includes('iPhone') || userAgent.includes('iPad'))
            os = 'iOS';
        // Actualiza las estadísticas por navegador
        visitsData.browserStats[browser] = (visitsData.browserStats[browser] || 0) + 1;
        // Actualiza las estadísticas por sistema operativo
        visitsData.osStats[os] = (visitsData.osStats[os] || 0) + 1;
        // Gestión de sesiones y nacionalidad
        const ip = req.ip || '127.0.0.1';
        const sessionId = ip || 'desconocido';
        // Obtiene la nacionalidad a partir de la IP
        let country = 'Desconocido';
        try {
            const geo = geoip.lookup(ip);
            if (geo && geo.country) {
                country = geo.country;
            }
        }
        catch (error) {
            console.error('Error en la búsqueda de geolocalización:', error);
        }
        // Actualiza las estadísticas por nacionalidad
        visitsData.countryStats[country] = (visitsData.countryStats[country] || 0) + 1;
        if (!visitsData.sessions[sessionId]) {
            // Nueva sesión, incrementa el contador de visitantes únicos
            visitsData.uniqueVisitors += 1;
            visitsData.sessions[sessionId] = {
                count: 1,
                lastVisit: now.toISOString(),
                paths: [pathName],
                country: country
            };
        }
        else {
            // Sesión existente
            visitsData.sessions[sessionId].count += 1;
            visitsData.sessions[sessionId].lastVisit = now.toISOString();
            // Agrega la ruta si no está ya presente
            if (!visitsData.sessions[sessionId].paths.includes(pathName)) {
                visitsData.sessions[sessionId].paths.push(pathName);
            }
            // Actualiza el país si no se había registrado antes
            if (!visitsData.sessions[sessionId].country) {
                visitsData.sessions[sessionId].country = country;
            }
        }
        // Actualiza la marca de tiempo
        visitsData.lastUpdated = now.toISOString();
        // Guarda los datos actualizados
        saveVisitsData(visitsData);
        next();
    }
    catch (error) {
        console.error('Error en el middleware de seguimiento de visitas:', error);
        next(); // Continúa la ejecución incluso en caso de error
    }
};
/**
 * Obtiene los datos de visitas
 */
export const getVisitsData = () => {
    return readVisitsData();
};
