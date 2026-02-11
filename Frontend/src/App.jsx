import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

// --- LAYOUTS Y UTILIDADES ---
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// --- PÁGINAS (VISTAS COMPLETAS) ---
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

// 1. Componente Wrapper para la animación (Fade Up suave)
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Empieza transparente y un poco abajo
      animate={{ opacity: 1, y: 0 }} // Sube a su sitio y se hace visible
      exit={{ opacity: 0, y: -20 }} // Se va hacia arriba y desaparece
      transition={{ duration: 0.3, ease: "easeInOut" }} // Duración de 0.3s
      style={{ width: "100%", height: "100%" }} // Asegura que ocupe el espacio
    >
      {children}
    </motion.div>
  );
};

// 2. Sub-componente que maneja la lógica de rutas y ubicación
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    // mode="wait" asegura que la página vieja salga antes de que entre la nueva
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/habitaciones"
          element={
            <PageTransition>
              <RoomsPage />
            </PageTransition>
          }
        />
        <Route
          path="/servicios"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />
        <Route
          path="/contacto"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />

        {/* Ruta 404 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />

      <Flex direction="column" minH="100vh" bg="gray.50">
        <Header />

        {/* Contenido Principal */}
        <Box as="main" flex="1" w="100%">
          {/* Renderizamos el componente que contiene la lógica de animación */}
          <AnimatedRoutes />
        </Box>

        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
