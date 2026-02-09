const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// Importamos validador
const {
  validate,
  bookingSchema,
} = require("../middleware/validationMiddleware");

// Validamos que las fechas tengan sentido antes de intentar reservar
router.post("/", protect, validate(bookingSchema), createBooking);
router.get("/mybookings", protect, getMyBookings);

module.exports = router;
