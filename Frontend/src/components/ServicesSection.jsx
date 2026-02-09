import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Container,
  Stack,
  Icon,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MdRestaurant,
  MdHotTub,
  MdWifi,
  MdDirectionsWalk,
  MdLocalActivity,
  MdBusiness,
} from "react-icons/md";

// Componente animado envoltorio
const MotionBox = motion(Box);

const ServicesSection = () => {
  // Colores del tema
  const bgCard = useColorModeValue("white", "gray.700");
  const iconColor = "brand.500"; // Usamos tu color de marca
  const hoverShadow = "2xl";

  // --- DATOS DE SERVICIOS ---
  const services = [
    {
      title: "Restaurante Gourmet",
      description: "Disfruta de exquisitos platos andinos e internacionales preparados por chefs expertos.",
      icon: MdRestaurant, // Pasamos la referencia del componente, no el elemento < />
      image: "/assets/images/Restaurante.jpeg",
    },
    {
      title: "Spa de Lujo",
      description: "Relájate y rejuvenece tu cuerpo con masajes y tratamientos en nuestro exclusivo spa.",
      icon: MdHotTub,
      image: "/assets/images/Spa.jpeg",
    },
    {
      title: "Wi-Fi de Alta Velocidad",
      description: "Mantente conectado siempre con nuestro rápido y confiable servicio de fibra óptica.",
      icon: MdWifi,
      image: "/assets/images/Wifi.jpeg",
    },
    {
      title: "Excursiones de Montaña",
      description: "Explora los majestuosos picos de Mérida y sube al Pico Bolívar con guías certificados.",
      icon: MdDirectionsWalk,
      image: "/assets/images/Montaña.jpeg",
    },
    {
      title: "Actividades Recreativas",
      description: "Disfruta de caminatas, paseos a caballo y una amplia gama de actividades al aire libre.",
      icon: MdLocalActivity,
      image: "/assets/images/Recreacion.jpg",
    },
    {
      title: "Salas de Reuniones",
      description: "Organiza conferencias y eventos corporativos en nuestras modernas salas equipadas.",
      icon: MdBusiness,
      image: "/assets/images/Reuniones.jpg",
    },
  ];

  // --- CONFIGURACIÓN DE ANIMACIÓN (Stagger/Cascada) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Cada tarjeta aparece 0.15s después de la anterior
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Empieza un poco abajo e invisible
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Box as="section" py={{ base: 12, md: 20 }} bg="gray.50" id="servicios">
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={12}
          color="brand.600"
          fontFamily="heading"
        >
          Nuestros Servicios
        </Heading>

        {/* Contenedor del Grid Animado */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Se anima cuando el 10% es visible
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {services.map((service, index) => (
              <MotionBox
                key={index}
                variants={itemVariants}
                bg={bgCard}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.3s"
                _hover={{ 
                  transform: "translateY(-8px)", // Se eleva al pasar el mouse
                  boxShadow: hoverShadow 
                }}
                position="relative"
              >
                {/* Imagen del Servicio */}
                <Box h="200px" overflow="hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="transform 0.5s"
                    _hover={{ transform: "scale(1.1)" }} // Zoom suave en la imagen
                  />
                </Box>

                {/* Contenido */}
                <Stack p={6} spacing={3}>
                  {/* Icono flotante o en línea */}
                  <Flex align="center">
                    <Flex 
                      w={10} 
                      h={10} 
                      align="center" 
                      justify="center" 
                      bg="brand.100" 
                      borderRadius="full" 
                      mr={3}
                    >
                      <Icon as={service.icon} w={5} h={5} color={iconColor} />
                    </Flex>
                    <Heading size="md" fontFamily="body" color="brand.600">
                      {service.title}
                    </Heading>
                  </Flex>

                  <Text color="gray.600" fontSize="sm" noOfLines={3}>
                    {service.description}
                  </Text>
                </Stack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ServicesSection;