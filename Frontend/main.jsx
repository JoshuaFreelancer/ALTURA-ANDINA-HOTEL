import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 1. Importaciones de Chakra UI
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 2. Importaciones de Fuentes (Instala @fontsource si no lo tienes)
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";

// 3. Definición de tu Paleta de Colores
const colors = {
  brand: {
    50: "#F2F8FC", // (Opcional) Tono muy claro para fondos
    100: "#DCE9F5",
    200: "#CDE0EE", // (Opcional) Intermedio
    300: "#BCE7F7",
    400: "#ABD8EC",
    500: "#6998A7", // Tu color principal
    600: "#313F3E", // Tu color oscuro/texto
    700: "#2A3635", // (Opcional) Hover oscuro
    800: "#1F2828", // (Opcional) Más oscuro
    900: "#151B1B", // (Opcional) Casi negro
  },
};

// 4. Configuración del Tema
const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'Lato', sans-serif`,
  },
  // Estilos globales para asegurar que el fondo y texto base usen tus colores
  styles: {
    global: {
      body: {
        bg: "gray.50", // Un fondo suave por defecto (o usa 'brand.100' si prefieres)
        color: "brand.600", // Tu color de texto principal
      },
    },
  },
});

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Solo ChakraProvider*/}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
