// backend/controllers/emailController.js
const nodemailer = require("nodemailer");
const { createEmailTemplate } = require("../utils/emailTemplate"); // Importamos el diseño

const sendEmail = async (req, res) => {
  const { email, subject, html, ...bookingData } = req.body;

  // 1. Configurar el Transportador (Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Preparar el contenido
  // Si tenemos datos de reserva (name), usamos el Template Bonito.
  // Si no, usamos el HTML básico (por si quieres mandar otro tipo de correos luego).
  const contentHtml = bookingData.name
    ? createEmailTemplate(bookingData)
    : html;

  const mailOptions = {
    from: `"Altura Andina Reservas" <${process.env.EMAIL_USER}>`, // Nombre personalizado
    to: email,
    subject: subject || "Confirmación de Solicitud - Altura Andina",
    html: contentHtml,
  };

  try {
    // 3. Enviar
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado ID:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Correo enviado correctamente",
    });
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar el correo. Intenta nuevamente.",
    });
  }
};

module.exports = { sendEmail };
