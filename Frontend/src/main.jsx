import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// IMPORTANTE: Asegúrate de tener instaladas las fuentes.
// Si no las tienes, ejecuta: npm install @fontsource/lato @fontsource/playfair-display
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";

// 1. Definimos tu paleta de colores limpia
const colors = {
  brand: {
    50: "#F0F7FC", // (Opcional) Agregué un tono muy claro para fondos suaves
    100: "#E6F0F8", // (Opcional)
    200: "#DCE9F5", // Tu color original
    300: "#BCE7F7", // Tu color original
    400: "#ABD8EC", // Tu color original
    500: "#6998A7", // Tu color PRIMARIO
    600: "#313F3E", // Tu color de TEXTO/OSCURO
    700: "#283332", // (Opcional) Un tono más oscuro para hovers
    800: "#1E2626", // (Opcional)
    900: "#151A1A", // (Opcional)
  },
};

// 2. Extendemos el tema de Chakra
const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'Lato', sans-serif`,
  },
  // Configuración global para que toda la app tome tus estilos base
  styles: {
    global: {
      body: {
        bg: "gray.50", // Un fondo gris muy suave por defecto
        color: "brand.600", // Tu color de texto por defecto
      },
      a: {
        color: "brand.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* ¡Solo Chakra! Adiós ThemeProvider de MUI */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
