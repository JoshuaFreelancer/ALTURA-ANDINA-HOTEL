const axios = require("axios");

const getWeather = async (req, res) => {
  try {
    // La Culata / El Valle (Clima de Montaña - Fresco)
    const lat = 8.7;
    const lon = -71.08;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "Falta API Key en el servidor" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    const response = await axios.get(url);

    // Filtramos los datos para el frontend
    const weatherData = {
      temp: Math.round(response.data.main.temp), // Redondeamos aquí
      description: response.data.weather[0].description,
      id: response.data.weather[0].id, // <--- ¡IMPORTANTE! Para elegir el icono
      humidity: response.data.main.humidity,
      city: "Mérida, VE",
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("❌ Error OpenWeather:", error.message);
    res.status(500).json({ message: "Error obteniendo clima" });
  }
};

module.exports = { getWeather };
