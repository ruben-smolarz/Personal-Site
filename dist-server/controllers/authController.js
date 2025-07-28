import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Carga las variables de entorno
dotenv.config();
// Clave secreta para JWT (debería estar en .env)
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';
// En una aplicación real, estas credenciales deberían estar almacenadas de forma segura,
// por ejemplo en una base de datos con contraseñas hasheadas
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
/**
 * Controlador para la autenticación
 */
export const login = (req, res) => {
    try {
        const { username, password } = req.body;
        // Verificar las credenciales
        if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            res.status(401).json({ error: "Credenciales no válidas" });
            return;
        }
        // Generar un token JWT
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' } // El token expira después de 7 días
        );
        // Enviar el token
        res.status(200).json({
            message: "Autenticación exitosa",
            token
        });
    }
    catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error durante la autenticación" });
    }
};
/**
 * Controlador para verificar si un token es válido
 */
export const verifyToken = (req, res) => {
    try {
        // El middleware de autenticación ya ha verificado el token,
        // por lo que si llegamos aquí, el token es válido
        res.status(200).json({
            message: "Token válido",
            user: req.user
        });
    }
    catch (error) {
        console.error("Error en la verificación del token:", error);
        res.status(500).json({ error: "Error durante la verificación del token" });
    }
};
