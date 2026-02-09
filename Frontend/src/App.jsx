import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

// --- PROVEEDORES ---
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

// Componentes
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import HotelSection from "./components/HotelSection";
import HotelCarousel from "./components/HotelCarousel";
import Habitaciones from "./components/Rooms";
import ReservationBar from "./components/ReservationBar";
import ServicesSection from "./components/ServicesSection";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import ScrollToTopButton from "./utils/ScrollToTopButton";
import OnSearch from "./utils/OnSearch";

// Contextos
import { HabitacionesProvider } from "./hooks/useHabitacionesContext";
import { DataProvider } from "./hooks/DataContext"; 
import "./App.css";

// --- ARREGLO DE SOMBRAS PARA QUE MUI Y CHAKRA NO PELEEN ---
const muiTheme = createTheme({
  // Definimos las sombras manualmente para evitar el error "theme.shadows[1] is undefined"
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    ...Array(23).fill("0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)")
  ],
  palette: {
    primary: { main: "#1976d2" },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
});

function App() {
  return (
    // 1. MuiThemeProvider ENVUELVE a Chakra
    <MuiThemeProvider theme={muiTheme}>
      {/* 2. resetCSS={false} evita que Chakra borre los estilos base de MUI */}
      <ChakraProvider resetCSS={false}> 
        <HabitacionesProvider>
          <DataProvider>
            <Router>
              <Header />
              <AnimatedRoutes />
              <Footer />
              <ScrollToTopButton />
            </Router>
          </DataProvider>
        </HabitacionesProvider>
      </ChakraProvider>
    </MuiThemeProvider>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions((styles, item) => (
    <animated.div style={styles} className="w-full">
      <Routes location={item}>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Rooms />} />
        <Route path="/servicios" element={<ServicesSection />} />
        <Route path="/contacto" element={<ContactForm />} />
      </Routes>
    </animated.div>
  ));
};

const Home = () => (
  <>
    <Welcome />
    <ReservationBar />
    <HotelSection />
    <Testimonials />
    <BlogSection />
  </>
);

const Rooms = () => (
  <>
    <HotelCarousel />
    <OnSearch />
    <Habitaciones />
  </>
);

export default App;