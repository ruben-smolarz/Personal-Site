import nodemailer from 'nodemailer';
/**
 * Controlador para el envío de correos de contacto
 * @param req - La solicitud Express
 * @param res - La respuesta Express
 */
export const sendContactEmail = async (req, res) => {
    console.log('Solicitud de contacto recibida:', req.body);
    const { name, email, subject, message } = req.body;
    // Validación de los datos
    if (!name || !email || !subject || !message) {
        console.log('Faltan datos en la solicitud');
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        });
    }
    try {
        // Verificar que las variables de entorno estén configuradas
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Falta la configuración del correo electrónico');
            return res.status(500).json({
                success: false,
                message: 'La configuración del servidor de correo no está completa'
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
            subject: `Nuevo mensaje del sitio: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #6d28d9; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Nuevo mensaje del formulario de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-line;">${message}</p>
        </div>
      `,
            replyTo: email
        };
        // Enviar el correo electrónico
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente:', info.messageId);
        return res.status(200).json({
            success: true,
            message: 'Correo enviado exitosamente'
        });
    }
    catch (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({
            success: false,
            message: 'Se produjo un error durante el envío del correo'
        });
    }
};
