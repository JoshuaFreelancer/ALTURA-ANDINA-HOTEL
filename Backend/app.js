const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { apiLimiter } = require("./middleware/rateLimitMiddleware");
require("dotenv").config(); // Cargar variables de entorno al inicio

// Importamos el Router Centralizado (que ya incluye Habitaciones, Usuarios, Clima y Email)
const apiRoutes = require("./routes/index");

const app = express();

// --- MIDDLEWARES ---
app.use(express.json()); // Parsear JSON en el body
app.use(cors()); // Permitir peticiones desde otros dominios (Frontend)
app.use(morgan("dev")); // Logger de peticiones HTTP

// --- RUTAS ---

// APLICAR EL LIMITADOR GENERAL A TODAS LAS RUTAS /api
app.use("/api", apiLimiter);

// Todas las rutas principales prefijadas con /api
app.use("/api", apiRoutes);

// Ruta base de salud (Health Check)
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API de Altura Andina 🏔️",
    status: "Running",
    timestamp: new Date(),
  });
});

// Manejo de errores 404 (Ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejo de errores global (500)
app.use((err, req, res, next) => {
  console.error("❌ Error del Servidor:", err.stack);
  res.status(500).json({
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

module.exports = app;
