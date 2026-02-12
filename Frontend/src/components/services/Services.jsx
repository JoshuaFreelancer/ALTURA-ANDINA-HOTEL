import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Stack,
  Icon,
  Flex,
  VStack,
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

const MotionBox = motion(Box);

// --- DATOS: URLs simplificadas con q_100 (Máxima Calidad) ---
const services = [
  {
    title: "Gastronomía Andina",
    description:
      "Fusión de sabores locales e internacionales en nuestro restaurante panorámico.",
    icon: MdRestaurant,
    // Eliminamos parámetros complejos. Solo q_100 para calidad máxima.
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/q_100/v1770903682/Restaurante_iwvf35.jpg",
  },
  {
    title: "Spa & Wellness",
    description:
      "Masajes relajantes, sauna y tratamientos corporales con productos orgánicos.",
    icon: MdHotTub,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/q_100/v1770903685/Spa_uujtjj.jpg",
  },
  {
    title: "Conexión Total",
    description:
      "Wi-Fi de fibra óptica de alta velocidad en todas las instalaciones.",
    icon: MdWifi,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/q_100/v1770903687/Wifi_m2bbqy.jpg",
  },
  {
    title: "Rutas de Montaña",
    description:
      "Excursiones guiadas al Pico Bolívar y lagunas de la Sierra Nevada.",
    icon: MdDirectionsWalk,
    // OJO: La ñ en la URL a veces da problemas si no está codificada. Aquí usamos la versión segura.
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/q_100/v1770903635/Monta%C3%B1a_h3vlto.jpg",
  },
  {
    title: "Recreación",
    description:
      "Paseos a caballo, senderismo y actividades para toda la familia.",
    icon: MdLocalActivity,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/q_100/v1770903727/eskil-helgesen-5RJ7FdzGlyE-unsplash_f7hssg.jpg",
  },
  {
    title: "Eventos Corporativos",
    description:
      "Salas equipadas para conferencias, retiros y celebraciones especiales.",
    icon: MdBusiness,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/q_100/v1770903684/Reuniones_yuzuyg.jpg",
  },
];

// --- COMPONENTE TARJETA "IMMERSIVA" ---
const ServiceCard = ({ title, description, icon, image }) => {
  return (
    <Box
      role="group"
      position="relative"
      h="350px"
      w="100%"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="xl"
      cursor="pointer"
    >
      {/* 1. IMAGEN DE FONDO */}
      <Box
        position="absolute"
        inset={0}
        // Usamos comillas dobles externas y simples internas para asegurar que la URL se lea bien
        bgImage={`url('${image}')`}
        bgSize="cover"
        bgPosition="center"
        transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _groupHover={{ transform: "scale(1.1)" }}
      />

      {/* 2. OVERLAY GRADIENTE */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-t, blackAlpha.900 0%, blackAlpha.600 40%, transparent 100%)"
        opacity={0.9}
        transition="opacity 0.3s"
        _groupHover={{ opacity: 1 }}
      />

      {/* 3. ICONO FLOTANTE */}
      <Flex
        position="absolute"
        top={4}
        right={4}
        w={12}
        h={12}
        align="center"
        justify="center"
        bg="whiteAlpha.200"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        border="1px solid whiteAlpha.300"
        transition="all 0.3s"
        _groupHover={{
          bg: "brand.500",
          color: "white",
          transform: "rotate(10deg)",
        }}
      >
        <Icon as={icon} w={6} h={6} color="white" />
      </Flex>

      {/* 4. CONTENIDO */}
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        p={8}
        spacing={2}
        w="100%"
        transform="translateY(10px)"
        transition="transform 0.3s"
        _groupHover={{ transform: "translateY(0)" }}
      >
        <Heading
          size="lg"
          color="white"
          fontFamily="heading"
          textShadow="0 2px 4px rgba(0,0,0,0.3)"
        >
          {title}
        </Heading>

        <Text
          color="gray.300"
          fontSize="md"
          noOfLines={3}
          lineHeight="tall"
          opacity={0.8}
          transition="all 0.3s"
          _groupHover={{ opacity: 1, color: "white" }}
        >
          {description}
        </Text>

        {/* Barra decorativa animada */}
        <Box
          w="0%"
          h="3px"
          bg="brand.500"
          transition="width 0.4s ease-out"
          _groupHover={{ w: "40%" }}
        />
      </Stack>
    </Box>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box as="section" py={{ base: 12 }} bg="gray.900" id="servicios">
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center" mb={16}>
          <Text
            color="brand.400"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="sm"
          >
            Comodidades de Lujo
          </Text>
          <Heading as="h2" size="2xl" color="white" fontFamily="heading">
            Todo lo que necesitas
          </Heading>
          <Text fontSize="lg" color="gray.400" maxW="2xl">
            Diseñamos cada detalle de tu estadía para garantizar confort,
            diversión y descanso.
          </Text>
        </VStack>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {services.map((service, index) => (
              <MotionBox key={index} variants={itemVariants}>
                <ServiceCard {...service} />
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ServicesSection;
