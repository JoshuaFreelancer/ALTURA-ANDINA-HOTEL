import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { Box, Flex } from "@chakra-ui/react";

// Componentes
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import HotelSection from "./components/HotelSection";
import HotelCarousel from "./components/HotelCarousel";
import Habitaciones from "./components/Rooms"; // Ojo: Verifica que el archivo se llame Rooms.jsx
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

// Eliminamos App.css si solo tenía parches. Si tiene estilos globales útiles, déjalo.
// import "./App.css";

function App() {
  return (
    // 1. Contextos de Datos (Lógica)
    <HabitacionesProvider>
      <DataProvider>
        <Router>
          {/* 2. Layout Principal usando Flex de Chakra */}
          {/* minH="100vh" asegura que el footer siempre se vaya al fondo si hay poco contenido */}
          <Flex direction="column" minH="100vh" bg="gray.50">
            <Header />

            {/* 3. Contenido Principal (Crece para ocupar espacio) */}
            <Box as="main" flex="1" w="100%">
              <AnimatedRoutes />
            </Box>

            <Footer />
            <ScrollToTopButton />
          </Flex>
        </Router>
      </DataProvider>
    </HabitacionesProvider>
  );
}

// Componente para manejar las animaciones de las rutas
const AnimatedRoutes = () => {
  const location = useLocation();

  // Configuración de la animación (Fade In/Out suave)
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateY(10px)" }, // Empieza un poco abajo y transparente
    enter: { opacity: 1, transform: "translateY(0px)" }, // Entra a su sitio
    leave: { opacity: 0, transform: "translateY(-10px)" }, // Se va hacia arriba
    config: { duration: 300 }, // Duración en ms
  });

  return transitions((styles, item) => (
    // animated.div es necesario para react-spring.
    // Usamos style={{ ...styles, width: '100%' }} para aplicar la animación y asegurar ancho total.
    <animated.div style={{ ...styles, width: "100%" }}>
      <Routes location={item}>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<RoomsPage />} />
        <Route path="/servicios" element={<ServicesSection />} />
        <Route path="/contacto" element={<ContactForm />} />
      </Routes>
    </animated.div>
  ));
};

// --- SUB-COMPONENTES DE PAGINA ---

const Home = () => (
  <Flex direction="column" gap={0}>
    {/* gap={0} asegura que no haya espacios blancos raros entre secciones */}
    <Welcome />
    <ReservationBar />
    <HotelSection />
    <Testimonials />
    <BlogSection />
  </Flex>
);

const RoomsPage = () => (
  <Flex direction="column" gap={6} pb={10}>
    <HotelCarousel />
    <Box px={{ base: 4, md: 8 }}>
      {" "}
      {/* Margen lateral responsivo */}
      <OnSearch />
      <Habitaciones />
    </Box>
  </Flex>
);

export default App;
