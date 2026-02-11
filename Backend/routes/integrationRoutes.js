const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");
const { sendEmail } = require("../controllers/emailController");
const { createPaymentIntent } = require('../controllers/paymentController');

// Ruta para Clima
router.get("/weather", getWeather);

// Ruta para Email
router.post("/email", sendEmail);

// Ruta para pagos
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
