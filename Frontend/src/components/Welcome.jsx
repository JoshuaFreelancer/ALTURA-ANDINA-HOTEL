import React from "react";
import { NavLink } from "react-router-dom";
import Snowfall from "react-snowfall";
import { 
  Box, 
  Flex, 
  Heading, 
  Button, 
  Stack, 
  IconButton, 
  useBreakpointValue 
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Creamos componentes animados compatibles con Chakra
const MotionHeading = motion(Heading);
const MotionBox = motion(Box);

function Welcome() {
  // Ajuste de altura responsivo
  const height = useBreakpointValue({ base: "400px", md: "500px", lg: "600px" });

  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box position="relative" w="100%" h={height} overflow="hidden">
      
      {/* 1. Efecto de Nieve (z-index bajo para no tapar botones) */}
      <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={10} pointerEvents="none">
        <Snowfall snowflakeCount={40} color="white" />
      </Box>

      {/* 2. Imagen de Fondo y Overlay */}
      <Flex
        w="100%"
        h="100%"
        bgImage="url('/assets/images/Welcome.jpg')" // Asegúrate que esta ruta exista en /public
        bgSize="cover"
        bgPosition="center"
        align="center"
        justify="center"
        position="relative"
      >
        {/* Overlay Oscuro (blackAlpha es genial para transparencias) */}
        <Box 
          position="absolute" 
          inset={0} 
          bg="blackAlpha.500" 
          zIndex={1} 
        />

        {/* 3. Contenido Central */}
        <Flex 
          direction="column" 
          align="center" 
          zIndex={20} 
          px={4} 
          textAlign="center"
        >
          {/* Título Animado con Framer Motion */}
          <MotionHeading
            as="h1"
            color="white"
            fontFamily="heading"
            fontWeight="bold"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            mb={8}
            textShadow="2px 2px 4px rgba(0,0,0,0.6)"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ¡Bienvenido a tu hogar lejos de casa!
          </MotionHeading>

          {/* Botón de Reserva */}
          <NavLink to="/contacto">
            <Button
              size="lg"
              colorScheme="red" // Usa un rojo estándar bonito o tu 'brand.500'
              bg="red.600"
              _hover={{ bg: "red.700", transform: "scale(1.05)" }}
              fontSize="xl"
              px={10}
              py={7}
              shadow="lg"
              fontFamily="body"
            >
              Reserva ahora
            </Button>
          </NavLink>
        </Flex>

        {/* 4. Iconos de Redes Sociales (Esquina Inferior) */}
        <Stack 
          direction="row" 
          spacing={4} 
          position="absolute" 
          bottom={6} 
          right={6} 
          zIndex={30}
        >
          <SocialButton icon={<FaFacebook />} onClick={() => handleRedirect("https://facebook.com")} />
          <SocialButton icon={<FaTwitter />} onClick={() => handleRedirect("https://twitter.com")} />
          <SocialButton icon={<FaInstagram />} onClick={() => handleRedirect("https://instagram.com")} />
          <SocialButton icon={<FaLinkedin />} onClick={() => handleRedirect("https://linkedin.com")} />
        </Stack>
      </Flex>
    </Box>
  );
}

// Componente pequeño para los botones sociales
const SocialButton = ({ icon, onClick }) => (
  <IconButton
    icon={icon}
    onClick={onClick}
    isRound
    variant="ghost"
    color="white"
    fontSize="24px"
    _hover={{ 
      bg: "whiteAlpha.300", 
      transform: "translateY(-3px)",
      color: "brand.300" 
    }}
    transition="all 0.3s"
    aria-label="Social Media"
  />
);

export default Welcome;