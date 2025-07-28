import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import contactRoutes from './routes/contact.js';
import visitsRoutes from './routes/visits.js';
import authRoutes from './routes/auth.js';
import { visitsTracker } from './middlewares/visitsTracker.js';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Check the environmental variables of the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Per ottenere __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verifica se esiste la directory dist (build frontend)
const distPath = path.join(__dirname, '../dist');
const isDistAvailable = fs.existsSync(distPath) && fs.existsSync(path.join(distPath, 'index.html'));

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Habilitar la compresión para todas las respuestas
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de seguimiento de visitas: debe colocarse antes de las rutas
app.use(visitsTracker);

// Sirva archivos estáticos desde la compilación de React si están disponibles
if (isDistAvailable) {
// console.log('Serving static files from dist directory');
  app.use(express.static(distPath));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/visits', visitsRoutes);

// Para todas las demás solicitudes, sirva la aplicación React si está disponible
if (isDistAvailable) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
} else {
// Si no hay ninguna compilación disponible, muestra un mensaje informativo
  app.get('/', (req, res) => {
    res.send('Server attivo. Per visualizzare il frontend, esegui il build con "npm run build"');
  });
}

app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
  if (!isDistAvailable) {
    // console.log('ADVERTENCIA: El directorio dist no se encuentra o está incompleto. Ejecute "npm run build" para crear el frontend.');
  }
});

export default app;