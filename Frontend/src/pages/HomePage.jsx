import { Box } from "@chakra-ui/react";
                
import Hero from "../components/home/Hero";          
import BookingBar from "../components/home/BookingBar";
import About from "../components/home/About";
import Testimonials from "../components/home/Testimonials";
import Tourism from "../components/home/Tourism";

const HomePage = () => {
  return (
    <Box>
      {/* El Hero y la Barra de Reservas van juntos */}
      <Hero />
      <BookingBar />

      {/* Resto de secciones */}
      <About />
      <Testimonials />
      <Tourism />
    </Box>
  );
};

export default HomePage;
