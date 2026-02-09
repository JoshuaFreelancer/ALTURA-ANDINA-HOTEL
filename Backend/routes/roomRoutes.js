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

// Importamos validador
const { validate, roomSchema } = require("../middleware/validationMiddleware");

router.get("/", getRooms);
router.get("/:id", getRoomById);

// Protegemos la creación y edición con validación de datos
router.post("/", protect, admin, validate(roomSchema), createRoom);
router.put("/:id", protect, admin, validate(roomSchema), updateRoom);
router.delete("/:id", protect, admin, deleteRoom);

module.exports = router;
