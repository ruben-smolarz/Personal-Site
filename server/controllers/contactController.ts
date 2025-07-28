import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

// Interfaz para el cuerpo de la solicitud
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Controlador para el envío de correos de contacto
 * @param req - La solicitud Express
 * @param res - La respuesta Express
 */
export const sendContactEmail = async (req: Request, res: Response) => {
  console.log('Contact request received:', req.body);
  
  const { name, email, subject, message } = req.body as ContactRequest;

  // Validación de los datos
  if (!name || !email || !subject || !message) {
    console.log('Missing data in the application');
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email settings are missing');
      return res.status(500).json({
        success: false,
        message: 'The mail server configuration is not complete'
      });
    }

    // Configuración del transportador de Nodemailer
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Opciones del correo electrónico
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `New message from the site: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #6d28d9; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New contact form message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Affair:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-line;">${message}</p>
        </div>
      `,
      replyTo: email
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending the email.'
    });
  }
};
