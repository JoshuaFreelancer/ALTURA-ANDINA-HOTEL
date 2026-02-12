import { NavLink } from "react-router-dom";
import Snowfall from "react-snowfall";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Animación para el título
const MotionHeading = motion(Heading);

//Imagen para el hero
const HeroImage =
  "https://res.cloudinary.com/drfyy4i0s/image/upload/v1770902445/Hero_umijtb.jpg";

function Hero() {
  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      position="relative"
      w="100%"
      h={{ base: "500px", md: "600px" }}
      overflow="hidden"
    >
      {/* 1. Nieve (z-index bajo) */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={10}
        pointerEvents="none"
      >
        <Snowfall snowflakeCount={40} color="white" style={{ opacity: 0.6 }} />
      </Box>

      {/* 2. Imagen de Fondo y Overlay */}
      <Flex
        w="100%"
        h="100%"
        bgImage={`url(${HeroImage})`}
        bgSize="cover"
        bgPosition="center"
        align="center"
        justify="center"
        position="relative"
      >
        {/* Overlay degradado para mejorar lectura */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.400, blackAlpha.600)"
          zIndex={1}
        />

        {/* 3. Contenido Central */}
        <Flex
          direction="column"
          align="center"
          zIndex={20}
          px={4}
          textAlign="center"
          maxW="container.lg"
        >
          <MotionHeading
            as="h1"
            color="white"
            fontFamily="heading"
            fontWeight="bold"
            // Tipografía responsive más grande
            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
            lineHeight="1.1"
            mb={6}
            textShadow="0px 4px 10px rgba(0,0,0,0.5)"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Tu refugio en los Andes
            <Text
              as="span"
              display="block"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="normal"
              mt={2}
              fontFamily="body"
            >
              Bienvenido a tu hogar lejos de casa
            </Text>
          </MotionHeading>

          <NavLink to="/contacto">
            <Button
              size="lg"
              bg="brand.500"
              color="white"
              fontSize="xl"
              px={12}
              py={8}
              borderRadius="full"
              shadow="2xl"
              _hover={{
                bg: "brand.600",
                transform: "translateY(-4px)",
                shadow: "dark-lg",
              }}
              transition="all 0.3s"
            >
              Reserva tu Experiencia
            </Button>
          </NavLink>

          {/* REDES SOCIALES (MÓVIL): Debajo del botón para que no tapen nada */}
          <HStack spacing={4} mt={8} display={{ base: "flex", md: "none" }}>
            <SocialButton
              icon={<FaFacebook />}
              onClick={() => handleRedirect("https://facebook.com")}
            />
            <SocialButton
              icon={<FaXTwitter />}
              onClick={() => handleRedirect("https://x.com/?lang=es")}
            />
            <SocialButton
              icon={<FaInstagram />}
              onClick={() => handleRedirect("https://instagram.com")}
            />
          </HStack>
        </Flex>

        {/* 4. REDES SOCIALES (PC/TABLET): Barra lateral izquierda elegante */}
        {/* Al ponerlo a la izquierda verticalmente, nunca será tapado por la BookingBar */}
        <VStack
          display={{ base: "none", md: "flex" }}
          position="absolute"
          left={8}
          top="50%"
          transform="translateY(-50%)"
          zIndex={30}
          spacing={6}
        >
          {/* Línea decorativa arriba */}
          <Box w="1px" h="60px" bg="whiteAlpha.600" />

          <SocialButton
            icon={<FaFacebook />}
            onClick={() => handleRedirect("https://facebook.com")}
          />
          <SocialButton
            icon={<FaXTwitter />}
            onClick={() => handleRedirect("https://x.com/?lang=es")}
          />
          <SocialButton
            icon={<FaInstagram />}
            onClick={() => handleRedirect("https://instagram.com")}
          />

          {/* Línea decorativa abajo */}
          <Box w="1px" h="60px" bg="whiteAlpha.600" />
        </VStack>
      </Flex>
    </Box>
  );
}

// Botón social reutilizable con estilo "Glassmorphism"
const SocialButton = ({ icon, onClick }) => (
  <IconButton
    icon={icon}
    onClick={onClick}
    isRound
    variant="ghost"
    color="white"
    fontSize="20px"
    bg="whiteAlpha.200" // Fondo semitransparente
    backdropFilter="blur(5px)" // Efecto borroso
    _hover={{
      bg: "brand.500",
      transform: "scale(1.1)",
      color: "white",
    }}
    transition="all 0.3s"
    aria-label="Social Media"
  />
);

export default Hero;
