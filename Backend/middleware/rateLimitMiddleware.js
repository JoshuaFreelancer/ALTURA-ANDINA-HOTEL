const rateLimit = require("express-rate-limit");

// 1. Limitador General (Para toda la API)
// "Si haces más de 100 peticiones en 15 minutos, te bloqueo"
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  standardHeaders: true, // Devuelve info en los headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
  message: {
    message: "⛔ Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos."
  },
});

// 2. Limitador Estricto (Para Login y Registro)
// "Solo 5 intentos cada hora. Si fallas, espera."
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 6, // Solo 5 intentos
  message: {
    message: "⛔ Demasiados intentos de inicio de sesión. Intenta de nuevo en una hora."
  },
});

module.exports = { apiLimiter, authLimiter };