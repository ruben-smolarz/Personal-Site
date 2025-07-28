import express from "express";
import { sendContactEmail } from "../controllers/contactController.js";

const router = express.Router();

// Ruta para enviar un correo electrónico de contacto
router.post("/send", sendContactEmail);

export default router;
