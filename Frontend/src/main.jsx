import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// --- IMPORTAMOS LOS PROVEEDORES DE CONTEXTO ---
import DataProvider from "./context/DataContext";
import RoomProvider from "./context/RoomContext";
// ---------------------------------------------

// Fuentes
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";

// 1. Definimos tu paleta de colores limpia
const colors = {
  brand: {
    50: "#F0F7FC",
    100: "#E6F0F8",
    200: "#DCE9F5",
    300: "#BCE7F7",
    400: "#ABD8EC",
    500: "#6998A7",
    600: "#313F3E",
    700: "#283332",
    800: "#1E2626",
    900: "#151A1A",
  },
};

// 2. Extendemos el tema de Chakra
const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'Lato', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "brand.600",
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
    <ChakraProvider theme={theme}>
      {/* Envolvemos la App con los Providers.
         El orden entre Data y Room no es crítico, 
         pero ambos deben estar dentro de ChakraProvider.
      */}
      <DataProvider>
        <RoomProvider>
          <App />
        </RoomProvider>
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
