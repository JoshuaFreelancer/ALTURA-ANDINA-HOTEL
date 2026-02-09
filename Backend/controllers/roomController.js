const Room = require("../models/Room");

// @desc    Obtener todas las habitaciones
// @route   GET /api/rooms
const getRooms = async (req, res) => {
  try {
    // Si envían ?roomType=Suite en la URL, filtramos. Si no, traemos todo.
    const { roomType } = req.query;
    const filter = roomType ? { roomType } : {};

    const rooms = await Room.find(filter);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener una habitación por ID
// @route   GET /api/rooms/:id
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear habitación (Admin)
// @route   POST /api/rooms
const createRoom = async (req, res) => {
  try {
    // El body debe coincidir con tu modelo Room.js
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Actualizar habitación (Admin)
// @route   PUT /api/rooms/:id
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el objeto actualizado
      runValidators: true, // Ejecuta las validaciones del modelo
    });

    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Eliminar habitación (Admin)
// @route   DELETE /api/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
    res.status(200).json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
