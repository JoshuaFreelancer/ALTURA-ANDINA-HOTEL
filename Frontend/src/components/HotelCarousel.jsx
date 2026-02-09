import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Estilos base del carrusel
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  IconButton,
  useColorModeValue,
  Container,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

// --- DATOS DEL CARRUSEL ---
// Tener esto separado hace que sea muy fácil añadir o quitar fotos después
const SLIDES = [
  {
    id: 1,
    title: "Habitación Estándar",
    price: 100,
    rating: 3,
    image: "/assets/images/Estandar.jpg", // Asegúrate de la ruta (agregué / al inicio)
    description: "Confort y economía para tu descanso.",
  },
  {
    id: 2,
    title: "Habitación de Lujo",
    price: 250,
    rating: 5,
    image: "/assets/images/Lujo.jpeg",
    description: "La experiencia premium definitiva.",
  },
  {
    id: 3,
    title: "Habitación Ejecutiva",
    price: 200,
    rating: 4,
    image: "/assets/images/Ejecutiva.jpeg",
    description: "Ideal para viajes de negocios.",
  },
];

const HotelCarousel = () => {
  // Colores dinámicos
  const arrowBg = useColorModeValue("whiteAlpha.800", "blackAlpha.600");
  const arrowHover = useColorModeValue("white", "black");
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)",
  );

  // Helper para renderizar estrellas
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Icon
        key={index}
        as={FaStar}
        color={index < rating ? "yellow.400" : "gray.300"}
        w={4}
        h={4}
      />
    ));
  };

  return (
    <Container maxW="container.xl" py={10} id="habitaciones">
      <Heading
        as="h2"
        size="2xl"
        textAlign="center"
        mb={8}
        color="brand.600"
        fontFamily="heading"
      >
        Habitaciones y Precios
      </Heading>

      <Box
        position="relative"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="2xl"
      >
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={false} // Ocultamos indicadores para un look más limpio
          interval={5000}
          transitionTime={700}
          stopOnHover
          swipeable
          emulateTouch
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <IconButton
                aria-label={label}
                icon={<FaChevronLeft />}
                onClick={onClickHandler}
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                bg={arrowBg}
                _hover={{ bg: arrowHover, color: "brand.500" }}
                isRound
                size="lg"
                shadow="md"
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <IconButton
                aria-label={label}
                icon={<FaChevronRight />}
                onClick={onClickHandler}
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                bg={arrowBg}
                _hover={{ bg: arrowHover, color: "brand.500" }}
                isRound
                size="lg"
                shadow="md"
              />
            )
          }
        >
          {SLIDES.map((slide) => (
            <Box
              key={slide.id}
              position="relative"
              h={{ base: "400px", md: "600px" }}
            >
              {/* IMAGEN DE FONDO */}
              <Image
                src={slide.image}
                alt={slide.title}
                objectFit="cover"
                w="100%"
                h="100%"
              />

              {/* TARJETA DE INFORMACIÓN (Esquina inferior derecha) */}
              <Box
                position="absolute"
                bottom={{ base: 4, md: 8 }}
                right={{ base: 4, md: 8 }}
                left={{ base: 4, md: "auto" }} // En móvil ocupa todo el ancho
                maxW={{ md: "400px" }}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                boxShadow="dark-lg"
                textAlign="left"
                backdropFilter="blur(5px)" // Efecto vidrio esmerilado
              >
                <Heading size="md" color="brand.600" fontFamily="body" mb={2}>
                  {slide.title}
                </Heading>

                <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                  {slide.description}
                </Text>

                <Flex justify="space-between" align="center">
                  <Stack direction="row" spacing={1}>
                    {renderStars(slide.rating)}
                  </Stack>
                  <Text fontWeight="bold" fontSize="lg" color="brand.500">
                    ${slide.price}{" "}
                    <Text as="span" fontSize="sm" color="gray.500">
                      / noche
                    </Text>
                  </Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default HotelCarousel;
