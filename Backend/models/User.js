const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // No pueden haber dos usuarios con el mismo correo
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // Rol del usuario: 'guest' (cliente) o 'admin' (tú)
  role: {
    type: String,
    enum: ["guest", "admin"],
    default: "guest",
  },

  phoneNumber: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// MIDDLEWARE DE MONGOOSE: Encriptar contraseña antes de guardar
userSchema.pre("save", async function (next) {
  // Si la contraseña no se modificó, no la volvemos a encriptar
  if (!this.isModified("password")) return next();

  // Generamos el "salt" y el hash
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// MÉTODO PERSONALIZADO: Comparar contraseñas (para el Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
