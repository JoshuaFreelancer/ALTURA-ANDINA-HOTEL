const Booking = require("../models/Booking");
const Room = require("../models/Room");

// @desc    Crear una nueva reserva
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    // req.user.id viene del middleware de auth (token)
    const userId = req.user.id;
    const { roomId, checkInDate, checkOutDate } = req.body;

    // 1. Validar fechas básicas
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    if (start >= end) {
      return res
        .status(400)
        .json({
          message: "La fecha de salida debe ser posterior a la de entrada",
        });
    }

    // 2. BUSCAR CONFLICTOS (La parte más importante)
    // Buscamos si existe alguna reserva para ESTA habitación donde:
    // (NuevaEntrada < ReservaSalida) Y (NuevaSalida > ReservaEntrada)
    const existingBooking = await Booking.findOne({
      room: roomId,
      status: { $ne: "cancelled" }, // Ignoramos las canceladas
      $or: [
        {
          checkInDate: { $lt: end },
          checkOutDate: { $gt: start },
        },
      ],
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "La habitación no está disponible en esas fechas" });
    }

    // 3. Calcular precio total
    const room = await Room.findById(roomId);
    if (!room)
      return res.status(404).json({ message: "Habitación no encontrada" });

    // Calculamos días de diferencia
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((start - end) / oneDay));
    const totalPrice = diffDays * room.pricePerNight;

    // 4. Crear la reserva
    const booking = await Booking.create({
      user: userId,
      room: roomId,
      checkInDate: start,
      checkOutDate: end,
      daysOfStay: diffDays,
      totalPrice,
      status: "confirmed", // O 'pending' si fueras a usar Stripe aquí
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// @desc    Obtener reservas del usuario logueado
// @route   GET /api/bookings/mybookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "room",
      "title images roomType",
    ); // Traemos datos de la habitación también

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};
