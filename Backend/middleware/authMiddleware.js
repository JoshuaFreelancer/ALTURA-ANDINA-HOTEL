const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  // 1. Verificar si el encabezado Authorization existe y empieza con 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Obtener el token (quitamos la palabra 'Bearer ' que son 7 caracteres)
      // Ejemplo: "Bearer eyJhbGci..." -> "eyJhbGci..."
      token = req.headers.authorization.split(" ")[1];

      // 3. Verificar el token usando tu variable de entorno
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Buscar el usuario en la BD y adjuntarlo a la request (req.user)
      // Excluimos la contraseña (.select('-password')) por seguridad
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Acceso no autorizado. Usuario no encontrado." });
      }

      next(); // Continuar al controlador
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Acceso no autorizado. Token inválido." });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado. No se proporcionó token." });
  }
};

// Middleware para verificar si es Administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({
        message: "Acceso denegado. Se requieren permisos de administrador.",
      });
  }
};

module.exports = { protect, admin };
