const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // Relación con la Habitación
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  // Relación con el Usuario
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  checkInDate: {
    type: Date,
    required: true,
  },

  checkOutDate: {
    type: Date,
    required: true,
  },

  // Precio total pagado por la estadía
  totalPrice: {
    type: Number,
    required: true,
  },

  // Cantidad de días (útil para reportes)
  daysOfStay: {
    type: Number,
    required: true,
  },

  // Estado de la reserva
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },

  // ID de pago de Stripe (lo usaremos más adelante)
  paymentId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
