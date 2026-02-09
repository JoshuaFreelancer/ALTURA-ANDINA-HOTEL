const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");
const { sendEmail } = require("../controllers/emailController");

// Ruta para Clima
router.get("/weather", getWeather);

// Ruta para Email
router.post("/email", sendEmail);

module.exports = router;
