const Joi = require("joi");

// --- Función Genérica de Validación ---
// Esta función actúa como el "Portero". Recibe un esquema (reglas) y revisa los datos.
const validate = (schema) => {
  return (req, res, next) => {
    // Validamos el body de la petición contra el esquema
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Si hay errores, los formateamos bonito para el frontend
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        message: "Datos inválidos",
        errors: errorMessages,
      });
    }

    // Si todo está bien, pasa al controlador
    next();
  };
};

// --- ESQUEMAS (Las Reglas del Juego) ---

// 1. Reglas para Registro de Usuario
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
  }),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required().messages({
    "string.email": "Debes introducir un correo electrónico válido",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
  // Opcional: admin o guest
  role: Joi.string().valid("admin", "guest"),
});

// 2. Reglas para Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// 3. Reglas para Crear Habitación
const roomSchema = Joi.object({
  title: Joi.string().required(),
  roomNumber: Joi.number().integer().positive().required(),
  roomType: Joi.string()
    .valid("Individual", "Doble", "Suite", "Familiar")
    .required(),
  description: Joi.string().required(),
  pricePerNight: Joi.number().positive().required(), // No puede ser negativo
  capacity: Joi.number().integer().min(1).required(),
  amenities: Joi.array().items(Joi.string()).required(),
  images: Joi.array().items(Joi.string()).optional(), // Ahora son strings (URLs), luego serán files
});

// 4. Reglas para Reservas
const bookingSchema = Joi.object({
  roomId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "El ID de la habitación no es válido",
    }),
  checkInDate: Joi.date().greater("now").required().messages({
    "date.greater": "La fecha de entrada debe ser futura",
  }),
  checkOutDate: Joi.date().greater(Joi.ref("checkInDate")).required().messages({
    "date.greater": "La fecha de salida debe ser posterior a la entrada",
  }),
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  roomSchema,
  bookingSchema,
};
