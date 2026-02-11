// src/services/api.js
import axios from "axios";

// Instancia única para conectar con tu Backend (Express)
const hotelApi = axios.create({
  // Asegúrate de que esta URL apunte a tu servidor (ej: http://localhost:5000/api)
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para Token (JWT)
hotelApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default hotelApi;
