const axios = require("axios");

// @desc    Obtener el clima actual de Mérida, Venezuela
// @route   GET /api/services/weather
const getWeather = async (req, res) => {
  try {
    // Coordenadas de Mérida, Venezuela
    const lat = 8.5952;
    const lon = -71.1436;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ message: "Falta la API Key de OpenWeather" });
    }

    // Solicitud a OpenWeatherMap (Unidades Métricas y en Español)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    const response = await axios.get(url);

    // Devolvemos solo los datos relevantes al frontend
    const weatherData = {
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      city: "Mérida, VE",
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("❌ Error OpenWeather:", error.message);
    res.status(500).json({ message: "No se pudo obtener el clima actual" });
  }
};

module.exports = { getWeather };
