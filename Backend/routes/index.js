const express = require("express");
const router = express.Router();

// Importamos las rutas individuales
const userRoutes = require("./userRoutes");
const roomRoutes = require("./roomRoutes");
const bookingRoutes = require("./bookingRoutes");
const integrationRoutes = require("./integrationRoutes");

// Definimos los endpoints base
router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/bookings", bookingRoutes);
router.use("/services", integrationRoutes);

module.exports = router;
