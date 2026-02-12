import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Icon,
  Flex,
  Button,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaTripadvisor,
  FaMapMarkedAlt,
  FaSnowflake,
  FaUtensils,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";

const MotionBox = motion(Box);

// --- 1. DEFINICIÓN DE IMÁGENES CLOUDINARY ---
const TourismImage = "https://res.cloudinary.com/drfyy4i0s/image/upload/v1770903537/El-teleferico-Mukumbari-en-el-estado-de-Merida-Venezuela_w7rtvx.jpg";
const HikingImage = "https://res.cloudinary.com/drfyy4i0s/image/upload/v1770903574/100575522.700x525_mim72s.jpg";

// --- TARJETA DE IMAGEN (Para Artículos y Guías) ---
const ImageCard = ({ title, description, image, link, linkText, icon }) => {
  return (
    <Box
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      position="relative"
      h="400px" 
      borderRadius="2xl"
      overflow="hidden"
      role="group"
      boxShadow="xl"
    >
      {/* Imagen de Fondo usando la prop 'image' que viene de Cloudinary */}
      <Box
        position="absolute"
        inset={0}
        bgImage={`url('${image}')`} // Aquí se inyecta la URL
        bgSize="cover"
        bgPosition="center"
        transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _groupHover={{ transform: "scale(1.1)" }}
      />

      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.400, transparent)"
        transition="opacity 0.3s"
        _groupHover={{
          bgGradient:
            "linear(to-t, blackAlpha.900, blackAlpha.600, blackAlpha.300)",
        }}
      />

      <Flex
        direction="column"
        justify="flex-end"
        h="100%"
        position="relative"
        p={8}
        zIndex={1}
      >
        <Icon as={icon} color="white" w={8} h={8} mb={4} opacity={0.9} />

        <Heading color="white" size="lg" mb={2} fontFamily="heading">
          {title}
        </Heading>

        <Text color="gray.200" fontSize="md" mb={6} noOfLines={3}>
          {description}
        </Text>

        <Button
          rightIcon={<FaArrowRight />}
          variant="outline"
          color="white"
          borderColor="whiteAlpha.600"
          _hover={{ bg: "white", color: "brand.600", borderColor: "white" }}
          size="sm"
          w="fit-content"
        >
          {linkText}
        </Button>
      </Flex>
    </Box>
  );
};

// --- TARJETA DE CONSEJOS (Sin cambios) ---
const TipsCard = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bg}
      h="400px"
      borderRadius="2xl"
      p={8}
      boxShadow="xl"
      position="relative"
      borderTop="6px solid"
      borderColor="brand.500"
      display="flex"
      flexDirection="column"
    >
      <Heading size="lg" color="brand.600" mb={2} fontFamily="heading">
        Tips del Viajero
      </Heading>
      <Text color="gray.500" mb={6} fontSize="sm">
        Secretos para disfrutar Mérida como un local.
      </Text>

      <VStack spacing={5} align="stretch" flex="1" justify="center">
        <TipItem
          icon={FaSnowflake}
          text="Lleva abrigo en capas. El clima cambia rápido."
        />
        <TipItem
          icon={FaUtensils}
          text="Prueba la Pisca Andina y los pastelitos."
        />
        <TipItem
          icon={FaCamera}
          text="Mejor luz para fotos: 7:00 AM y 5:00 PM."
        />
        <TipItem
          icon={FaMapMarkedAlt}
          text="Reserva el teleférico con antelación."
        />
      </VStack>
    </Box>
  );
};

const TipItem = ({ icon, text }) => (
  <Flex align="center">
    <Flex
      align="center"
      justify="center"
      w={10}
      h={10}
      borderRadius="full"
      bg="brand.50"
      color="brand.500"
      mr={4}
      shrink={0}
    >
      <Icon as={icon} w={4} h={4} />
    </Flex>
    <Text fontSize="sm" color="gray.600" fontWeight="medium">
      {text}
    </Text>
  </Flex>
);

const Tourism = () => {
  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="gray.50" id="blog-section">
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center" mb={16}>
          <Heading as="h2" size="2xl" color="brand.600" fontFamily="heading">
            Explora la Ciudad de los Caballeros
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl">
            Mérida es historia, aventura y sabor. Aquí tienes las herramientas
            para descubrirla.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          
          {/* 1. TripAdvisor */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ImageCard
              title="Atracciones Top"
              description="Descubre qué opinan otros viajeros sobre el Teleférico Mukumbarí, la Laguna de Mucubají y más."
              // --- CORRECCIÓN AQUÍ: Usamos la variable TourismImage ---
              image={TourismImage} 
              link="https://www.tripadvisor.com.ve/Attractions-g316050-Activities-Merida_Andean_Region.html"
              linkText="Ver en TripAdvisor"
              icon={FaTripadvisor}
            />
          </MotionBox>

          {/* 2. Consejos */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TipsCard />
          </MotionBox>

          {/* 3. Guías */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ImageCard
              title="Guías de Rutas"
              description="Mapas detallados, rutas de senderismo y recorridos por los pueblos del páramo merideño."
              // --- CORRECCIÓN AQUÍ: Usamos la variable HikingImage ---
              image={HikingImage}
              link="https://www.venezuelatuya.com/andes/guia_turistica_de_merida.htm"
              linkText="Leer Guía Completa"
              icon={FaMapMarkedAlt}
            />
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Tourism;