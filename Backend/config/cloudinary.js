const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

// --- CORRECCIÓN DEL ERROR DE LIBRERÍA ---
const cloudinaryStorageLib = require("multer-storage-cloudinary");
const CloudinaryStorage =
  cloudinaryStorageLib.CloudinaryStorage || cloudinaryStorageLib;

// 1. Verificación de seguridad
if (!process.env.CLOUDINARY_URL) {
  console.warn("⚠️ Advertencia: CLOUDINARY_URL no está definida en el .env");
}

// 2. Configuración de Cloudinary
// Al tener CLOUDINARY_URL en el .env, la librería se configura sola.
// Solo añadimos 'secure: true' para asegurar que las URLs generadas sean siempre HTTPS.
cloudinary.config({
  secure: true,
});

// 3. Configurar el almacenamiento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "altura_andina_rooms",
    // Soportamos ambas notaciones por compatibilidad de versiones
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    allowedFormats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
