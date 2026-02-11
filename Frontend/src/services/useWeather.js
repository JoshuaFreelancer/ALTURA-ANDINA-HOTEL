import { useState, useEffect } from "react";
import hotelApi from "../services/api"; // Usamos nuestra instancia configurada
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo de iconos basado en el ID de OpenWeather
  const getIcon = (code) => {
    if (code >= 200 && code < 300) return WiThunderstorm;
    if (code >= 300 && code < 600) return WiRain;
    if (code >= 600 && code < 700) return WiSnow; // Nieve en el Pico Bolívar
    if (code >= 700 && code < 800) return WiFog;
    if (code === 800) return WiDaySunny;
    if (code > 800) return WiCloudy;
    return WiDaySunny;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // --- CAMBIO CLAVE: Llamamos a NUESTRO backend ---
        // La ruta debe coincidir con tu router.get('/services/weather'...)
        const { data } = await hotelApi.get("/services/weather");

        console.log("🌦️ Clima desde Backend:", data);

        setWeatherData({
          temp: data.temp,
          description: data.description,
          icon: getIcon(data.id), // Usamos el ID que nos mandó el backend
          city: data.city,
          humidity: data.humidity,
        });
      } catch (err) {
        console.error("Error conectando con el servicio de clima:", err);
        setError("No se pudo cargar el clima");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weatherData, loading, error };
};
