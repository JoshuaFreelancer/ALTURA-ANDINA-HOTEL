import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Avatar,
  Stack,
  Container,
  Button,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Flex,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaMountain,
} from "react-icons/fa";

// Componente animado
const MotionBox = motion(Box);

const TESTIMONIALS = [
  {
    quote:
      "La vista al Pico Bolívar desde la habitación es algo que nunca olvidaré. El chocolate caliente en el lobby es el mejor detalle.",
    author: "Juan Perez",
    role: "Viaje de Aniversario",
    rating: 5,
    // Cambios: w_500, h_500 (Alta resolución) y q_100 (Máxima calidad)
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/w_500,h_500,c_fill,g_face,q_100/v1770903418/client1_uwmbic.jpg",
    date: "12 FEB 2024",
  },
  {
    quote:
      "Ubicación estratégica. Estuvimos cerca del teleférico y del centro, pero con la paz de la montaña. El personal de 10.",
    author: "Laura Mendoza",
    role: "Turista Internacional",
    rating: 5,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/w_500,h_500,c_fill,g_face,q_100/v1770903421/client4_boz0ze.jpg",
    date: "05 ENE 2024",
  },
  {
    quote:
      "Las instalaciones son impecables. Mis hijos disfrutaron mucho las áreas verdes y nosotros la tranquilidad.",
    author: "Familia Rivas",
    role: "Vacaciones Familiares",
    rating: 4,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/w_500,h_500,c_fill,g_face,q_100/v1770903420/client3_j0veyd.jpg",
    date: "20 DIC 2023",
  },
  {
    quote:
      "El Spa fue la cereza del pastel después de un día de caminata por la Sierra. Masajistas muy profesionales.",
    author: "Ana & David",
    role: "Pareja Aventurera",
    rating: 5,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/w_500,h_500,c_fill,g_face,q_100/v1770903419/client2_xogu8v.jpg",
    date: "14 NOV 2023",
  },
  {
    quote:
      "Excelente conexión a internet para trabajar remoto con vista a la montaña. El desayuno andino es obligatorio.",
    author: "Luis Hernández",
    role: "Nómada Digital",
    rating: 5,
    image:
      "https://res.cloudinary.com/drfyy4i0s/image/upload/w_500,h_500,c_fill,g_face,q_100/v1770903444/client5_plqm62.jpg",
    date: "02 OCT 2023",
  },
];

// --- COMPONENTE: ESTAMPILLA POSTAL ---
const PostageStamp = () => (
  <Box
    position="absolute"
    top={4}
    right={4}
    w="60px"
    h="70px"
    bg="white"
    border="4px double"
    borderColor="brand.200"
    boxShadow="sm"
    p={1}
    display="flex"
    alignItems="center"
    justifyContent="center"
    transform="rotate(5deg)"
    zIndex={1}
  >
    <VStack spacing={0}>
      <Icon as={FaMountain} color="brand.400" w={6} h={6} />
      <Text fontSize="0.5rem" fontWeight="bold" color="brand.500" mt={1}>
        ANDES
      </Text>
    </VStack>

    {/* El "Cuño" o Sello de tinta encima */}
    <Box
      position="absolute"
      top="-10px"
      left="-20px"
      w="60px"
      h="60px"
      border="2px solid"
      borderColor="gray.400"
      borderRadius="full"
      opacity={0.4}
      transform="rotate(-20deg)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        fontSize="0.4rem"
        color="gray.600"
        fontWeight="black"
        textAlign="center"
      >
        MÉRIDA
        <br />
        POST
      </Text>
    </Box>
  </Box>
);

const Testimonials = () => {
  const [showMore, setShowMore] = useState(false);

  // Color Papel Crema (Premium)
  const paperBg = useColorModeValue("#fffdf5", "gray.700");
  const inkColor = useColorModeValue("gray.700", "gray.200");
  const starColor = "orange.400";

  const visibleTestimonials = showMore
    ? TESTIMONIALS
    : TESTIMONIALS.slice(0, 3);

  const renderStars = (rating) => (
    <HStack spacing={1} mb={2}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          as={FaStar}
          color={i < rating ? starColor : "gray.300"}
          w={3}
          h={3}
        />
      ))}
    </HStack>
  );

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      py={{ base: 16 }}
      id="testimonios"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <Stack spacing={4} textAlign={"center"} mb={16}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            color="brand.600"
            fontFamily="heading"
          >
            Historias de Huéspedes
          </Heading>
          <Text color={"gray.600"} fontSize={"lg"}>
            Experiencias reales en el corazón de Mérida.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={12} px={4}>
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((testimonial, index) => {
              // Alternamos rotación para efecto "desordenado" natural
              const rotation = index % 2 === 0 ? -2 : 2;

              return (
                <MotionBox
                  key={testimonial.author}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
                  animate={{ opacity: 1, scale: 1, rotate: rotation }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0, // Se endereza al pasar el mouse
                    zIndex: 10,
                    boxShadow: "2xl",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Box
                    bg={paperBg}
                    p={8}
                    h="100%"
                    position="relative"
                    // Sombra realista para efecto 3D
                    boxShadow="10px 10px 20px rgba(0,0,0,0.1)"
                    border="1px solid"
                    borderColor="blackAlpha.100"
                    borderRadius="sm" // Bordes poco redondeados como papel
                  >
                    {/* Estampilla en la esquina */}
                    <PostageStamp />

                    {/* Contenido tipo Carta */}
                    <Stack spacing={4} mt={4}>
                      {/* Fecha estilo sello */}
                      <Text
                        fontFamily="mono"
                        fontSize="xs"
                        color="gray.400"
                        letterSpacing="widest"
                      >
                        {testimonial.date} • VÍA AÉREA
                      </Text>

                      {/* Cuerpo del texto */}
                      <Box position="relative">
                        <Icon
                          as={FaQuoteLeft}
                          color="brand.200"
                          w={8}
                          h={8}
                          position="absolute"
                          top={-2}
                          left={-2}
                          zIndex={0}
                          opacity={0.5}
                        />
                        <Text
                          color={inkColor}
                          fontSize="md"
                          lineHeight="1.8"
                          fontFamily="body" // Podrías usar una fuente 'handwriting' aquí
                          position="relative"
                          zIndex={1}
                          fontStyle="italic"
                        >
                          {testimonial.quote}
                        </Text>
                      </Box>

                      <Divider
                        borderColor="blackAlpha.200"
                        borderStyle="dashed"
                      />

                      {/* Remitente (Firma) */}
                      <Flex align="center" gap={3}>
                        <Avatar
                          src={testimonial.image}
                          name={testimonial.author}
                          size="md"
                          border="2px solid white"
                          boxShadow="md"
                        />
                        <Box>
                          <Text
                            fontWeight="bold"
                            fontSize="sm"
                            color="brand.800"
                            fontFamily="heading"
                          >
                            {testimonial.author}
                          </Text>
                          {renderStars(testimonial.rating)}
                        </Box>
                      </Flex>
                    </Stack>
                  </Box>
                </MotionBox>
              );
            })}
          </AnimatePresence>
        </SimpleGrid>

        <Flex justify="center" mt={16}>
          <Button
            onClick={() => setShowMore(!showMore)}
            colorScheme="brand"
            bg="brand.600"
            color="white"
            rounded="full"
            px={10}
            size="lg"
            shadow="lg"
            _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
            rightIcon={showMore ? <FaChevronUp /> : <FaChevronDown />}
          >
            {showMore ? "Ver menos testimonios" : "Leer más historias"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Testimonials;
