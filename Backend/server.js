require("dotenv").config(); // Importante: Cargar variables ANTES de todo
const mongoose = require("mongoose");
const app = require("./app");

// Importamos el orquestador de semillas
const { ejecutarSemillas } = require("./seeds");

const PORT = process.env.PORT || 5000;

// Función asíncrona para iniciar todo en orden
const iniciarServidor = async () => {
  try {
    // 1. Conectar a Base de Datos
    // Eliminé las opciones deprecated ya que Mongoose 6+ no las necesita
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB exitosamente");

    // 2. Cargar semillas (Usuarios Admin y Habitaciones)
    // Esto verificará si existen y los creará si no.
    await ejecutarSemillas();

    // 3. Encender el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
      console.log(`🔗 API disponible en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Error CRÍTICO al iniciar el servidor:", error);
    process.exit(1); // Detener el proceso si falla la DB
  }
};

iniciarServidor();
