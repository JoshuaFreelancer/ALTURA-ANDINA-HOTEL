const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const {
  validate,
  registerSchema,
  loginSchema,
} = require("../middleware/validationMiddleware");

// Importamos el limitador estricto
const { authLimiter } = require("../middleware/rateLimitMiddleware");

// Aplicamos authLimiter SOLO a estas rutas críticas
router.post("/register", authLimiter, validate(registerSchema), registerUser);
router.post("/login", authLimiter, validate(loginSchema), loginUser);

router.get("/me", protect, getMe);

module.exports = router;
