const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  // Título o nombre comercial (ej: "Suite Vista al Pico")
  title: {
    type: String,
    required: true,
    trim: true,
  },

  // Número de habitación único (vital para la administración)
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  // Tipo de habitación (Útil para filtrar en el Frontend)
  roomType: {
    type: String,
    required: true,
    enum: ["Individual", "Doble", "Suite", "Familiar"], // Valores permitidos
  },

  description: {
    type: String,
    required: true,
  },

  // Precio base por noche (La lógica de semana/mes se calcula sobre esto)
  pricePerNight: {
    type: Number,
    required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  // Array de strings para cosas como "Wifi", "TV", "Jacuzzi"
  amenities: {
    type: [String],
    required: true,
  },

  // URLs de las imágenes (Cloudinary u otro servicio)
  images: {
    type: [String],
    required: true,
  },

  // Disponibilidad general (por ejemplo, si está en mantenimiento)
  isAvailable: {
    type: Boolean,
    default: true,
  },

  // Rating promedio calculado (se actualiza cuando se agregan reviews)
  averageRating: {
    type: Number,
    default: 0,
  },

  // Referencia a las Reviews (Relación Virtual o directa)
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
