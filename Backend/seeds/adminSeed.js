const User = require("../models/User");
require("dotenv").config(); // Para leer variables si las necesitas

const cargarAdmin = async () => {
  try {
    // 1. Verificar si ya existe un usuario con rol 'admin'
    const adminExistente = await User.findOne({ role: "admin" });

    if (adminExistente) {
      console.log("✅ El usuario Administrador ya existe.");
      return;
    }

    // 2. Si no existe, creamos uno por defecto
    const adminUser = await User.create({
      firstName: "Admin",
      lastName: "Principal",
      email: "admin@alturaandina.com",
      password: "admin123456", // ¡Cámbiala después de entrar!
      role: "admin", // Vital para que funcione el middleware 'admin'
      phoneNumber: "+584120000000",
    });

    console.log(
      `👮‍♂️ Usuario Admin creado: ${adminUser.email} / password: admin123456`,
    );
  } catch (error) {
    console.error("❌ Error al crear el Admin:", error);
  }
};

module.exports = { cargarAdmin };
