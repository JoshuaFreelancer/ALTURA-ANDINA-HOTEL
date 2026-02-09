const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper para generar el JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // El token dura 30 días
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. Verificar si ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // 2. Crear usuario (El hash del password se hace solo en el Modelo, ¿recuerdas?)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // 3. Responder con datos y token
    if (user) {
      res.status(201).json({
        _id: user.id,
        firstName: user.firstName,
        email: user.email,
        token: generateToken(user.id),
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Datos de usuario inválidos" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar por email
    const user = await User.findOne({ email });

    // 2. Verificar password con el método que creamos en el modelo
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        firstName: user.firstName,
        email: user.email,
        token: generateToken(user.id),
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener datos del usuario actual (Perfil)
// @route   GET /api/users/me
const getMe = async (req, res) => {
  // req.user vendrá del middleware de autenticación (próximo paso)
  const user = {
    id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    role: req.user.role,
  };
  res.status(200).json(user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
