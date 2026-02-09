const express = require("express");
const router = express.Router();
const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  validate,
  roomSchema,
  parseImages,
} = require("../middleware/validationMiddleware"); // Importar parseImages
const { upload } = require("../config/cloudinary"); // Importar configuración de subida

// Rutas Públicas
router.get("/", getRooms);
router.get("/:id", getRoomById);

// --- RUTAS DE ADMIN CON SUBIDA DE FOTOS ---

// CREAR: Acepta hasta 5 imágenes en el campo "images"
router.post(
  "/",
  protect,
  admin,
  upload.array("images", 5), // 1. Multer sube a Cloudinary
  parseImages, // 2. Ponemos las URLs en req.body
  validate(roomSchema), // 3. Joi valida los datos (incluyendo las URLs de las fotos)
  createRoom, // 4. Controlador guarda en BD
);

// EDITAR: Lo mismo, permite subir nuevas fotos
router.put(
  "/:id",
  protect,
  admin,
  upload.array("images", 5),
  parseImages,
  validate(roomSchema),
  updateRoom,
);

router.delete("/:id", protect, admin, deleteRoom);

module.exports = router;
