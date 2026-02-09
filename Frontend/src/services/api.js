import axios from 'axios';

// --- 1. INSTANCIA PRINCIPAL (Para tu Backend: Habitaciones, Reservas, Auth) ---
// Esta es la que usarán la mayoría de tus componentes.
const hotelApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el Token automáticamente (si existe)
// Esto te servirá cuando hagamos el Login.
hotelApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // O donde guardes tu JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// --- 2. SERVICIO DE CLIMA (Externo) ---
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'tu_clave_si_no_usas_env';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city, lang = 'es') => {
  try {
    // Usamos axios directamente aquí para no mezclar con la configuración del backend
    const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        lang: lang,
        units: 'metric' // ¡TRUCO! Esto nos devuelve Celsius directo. Adiós matemáticas.
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    // Devolvemos null o lanzamos el error para que el componente lo maneje
    throw error;
  }
};

// Exportamos por defecto la API del hotel
export default hotelApi;