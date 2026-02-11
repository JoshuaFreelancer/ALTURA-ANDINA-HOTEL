import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  IconButton,
  Stack,
  Tag,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useRooms } from "../../hooks/useRooms"; // Hook de datos reales

const RoomsCarousel = () => {
  const { habitaciones, loading } = useRooms();

  // Configuración responsiva para el carrusel
  const centerSlidePercentage = useBreakpointValue({ base: 100, md: 80 });

  // Si está cargando o no hay habitaciones, no mostramos nada (o podrías poner un skeleton)
  if (loading || !habitaciones || habitaciones.length === 0) return null;

  // Filtramos solo las habitaciones destacadas (ej: rating > 4.5) o tomamos las primeras 5
  const featuredRooms = habitaciones.slice(0, 5);

  return (
    <Box position="relative" w="100%" mb={8} className="hotel-carousel-wrapper">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={6000}
        transitionTime={800}
        centerMode={true} // Efecto moderno: se ve un poco de la siguiente slide
        centerSlidePercentage={centerSlidePercentage}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <IconButton
              aria-label={label}
              icon={<FaChevronLeft />}
              onClick={onClickHandler}
              position="absolute"
              left={{ base: 2, md: 10 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              colorScheme="blackAlpha"
              isRound
              size="lg"
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
              right={{ base: 2, md: 10 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              colorScheme="blackAlpha"
              isRound
              size="lg"
            />
          )
        }
      >
        {featuredRooms.map((room) => (
          <Box
            key={room._id}
            h={{ base: "300px", md: "450px" }} // Altura controlada, no gigante
            mx={{ base: 0, md: 4 }} // Margen entre slides en PC
            position="relative"
            borderRadius={{ base: 0, md: "2xl" }}
            overflow="hidden"
            boxShadow="2xl"
          >
            {/* IMAGEN DE FONDO */}
            <Image
              src={room.images?.[0] || "/assets/images/Hotel.png"}
              alt={room.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />

            {/* OVERLAY GRADIENTE (Mejor que una caja solida) */}
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, blackAlpha.900 0%, blackAlpha.500 50%, transparent 100%)"
            />

            {/* INFO CONTENT */}
            <Flex
              position="absolute"
              bottom={0}
              left={0}
              w="100%"
              p={{ base: 4, md: 8 }}
              direction="column"
              align="flex-start"
              textAlign="left"
            >
              <Stack direction="row" mb={2}>
                <Tag
                  colorScheme="brand"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  {room.roomType}
                </Tag>
                <Flex align="center" bg="yellow.400" px={2} borderRadius="md">
                  <Text fontSize="xs" fontWeight="bold" color="black">
                    {room.averageRating}
                  </Text>
                  <FaStar size={10} color="black" style={{ marginLeft: 4 }} />
                </Flex>
              </Stack>

              <Heading
                as="h3"
                color="white"
                size={{ base: "md", md: "lg" }}
                fontFamily="heading"
                textShadow="0 2px 4px rgba(0,0,0,0.5)"
                mb={1}
              >
                {room.title}
              </Heading>

              <Text
                color="gray.300"
                fontSize={{ base: "sm", md: "md" }}
                noOfLines={1}
                maxW="80%"
                mb={4}
              >
                {room.description}
              </Text>

              <Flex align="center" justify="space-between" w="100%">
                <Text color="white" fontWeight="bold" fontSize="2xl">
                  ${room.pricePerNight}{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    /noche
                  </span>
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default RoomsCarousel;
