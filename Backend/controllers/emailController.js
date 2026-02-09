const sgMail = require("@sendgrid/mail");

// Configurar la API Key una sola vez al cargar el archivo
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("⚠️ Advertencia: No se encontró SENDGRID_API_KEY en .env");
}

// @desc    Enviar un correo genérico
// @route   POST /api/services/email
const sendEmail = async (req, res) => {
  try {
    const { email, subject, text, html } = req.body;

    const msg = {
      to: email, // El destinatario
      from: process.env.EMAIL_FROM, // Tu correo verificado en SendGrid (ej: info@alturaandina.com)
      subject: subject,
      text: text,
      html: html,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Correo enviado exitosamente 📧" });
  } catch (error) {
    console.error("❌ Error SendGrid:", error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.status(500).json({
      message: "Error al enviar el correo",
      error: error.message,
    });
  }
};

module.exports = { sendEmail };
