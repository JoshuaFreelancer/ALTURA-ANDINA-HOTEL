import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
  Stack,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Flex,
  Icon,
  Spinner,
  Center,
  Container,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FaUserFriends, FaImages, FaCheckCircle, FaStar } from "react-icons/fa";
import { useHabitaciones } from "../hooks/useHabitacionesContext";

const Habitaciones = () => {
  // 1. ZONA DE HOOKS
  const { filteredHabitaciones, loading } = useHabitaciones();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [reviewText, setReviewText] = useState("");

  // Colores del tema
  const bgCard = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const headingColor = useColorModeValue("gray.700", "white");

  // 2. FUNCIONES
  const handleVerDetalles = (habitacion) => {
    setSelectedHabitacion(habitacion);
    onOpen();
  };

  const handleSubmitReview = () => {
    console.log(`Review para ${selectedHabitacion._id}: ${reviewText}`);
    // Aquí iría tu lógica de axios.post para guardar la review
    setReviewText("");
    onClose();
  };

  // 3. RENDERIZADO CONDICIONAL
  if (loading) {
    return (
      <Center h="300px" w="100%">
        <Stack align="center" spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" speed="0.65s" />
          <Text color="brand.500" fontWeight="bold">
            Cargando habitaciones...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (!filteredHabitaciones || filteredHabitaciones.length === 0) {
    return (
      <Center h="200px">
        <Text fontSize="lg" color="gray.500">
          No se encontraron habitaciones disponibles.
        </Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading
        as="h2"
        size="xl"
        mb={8}
        textAlign="center"
        color="brand.600"
        fontFamily="heading"
      >
        Nuestras Habitaciones
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {filteredHabitaciones.map((habitacion) => (
          <Box
            key={habitacion._id} // MongoDB usa _id (con guion bajo)
            maxW={"445px"}
            w={"full"}
            bg={bgCard}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.02)" }}
          >
            {/* IMAGEN PRINCIPAL */}
            <Box
              h={"210px"}
              bg={"gray.100"}
              mt={-6}
              mx={-6}
              mb={6}
              pos={"relative"}
              overflow="hidden"
            >
              {habitacion.images && habitacion.images.length > 0 ? (
                <Image
                  src={habitacion.images[0]} // Usamos 'images' (inglés)
                  alt={habitacion.title}
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                />
              ) : (
                <Center h="100%">
                  <Stack align="center" color="gray.400">
                    <Icon as={FaImages} boxSize={10} />
                    <Text>Sin imagen</Text>
                  </Stack>
                </Center>
              )}
            </Box>

            <Stack>
              <Text
                color={"brand.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"xs"}
                letterSpacing={1.1}
              >
                {habitacion.roomType} {/* Usamos 'roomType' */}
              </Text>

              <Heading
                color={headingColor}
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {habitacion.title} {/* Usamos 'title' */}
              </Heading>

              <Text color={textColor} noOfLines={2}>
                {habitacion.description} {/* Usamos 'description' */}
              </Text>

              {/* RATING (Nuevo: Usando averageRating de tu DB) */}
              <Flex align="center">
                <Icon as={FaStar} color="yellow.400" mr={1} />
                <Text fontWeight="bold" fontSize="sm">
                  {habitacion.averageRating || "Nuevo"}
                </Text>
              </Flex>
            </Stack>

            <Stack
              mt={6}
              direction={"row"}
              spacing={4}
              align={"center"}
              justify="space-between"
            >
              <Badge px={2} py={1} bg="gray.50" fontWeight={"400"} rounded="md">
                <Flex align="center">
                  <Icon as={FaUserFriends} mr={2} color="brand.500" />
                  Max: {habitacion.capacity} {/* Usamos 'capacity' */}
                </Flex>
              </Badge>
              <Text fontWeight="bold" fontSize="xl" color="brand.600">
                ${habitacion.pricePerNight}{" "}
                <span style={{ fontSize: "0.8rem", color: "gray" }}>
                  /noche
                </span>
              </Text>
            </Stack>

            <Button
              w={"full"}
              mt={8}
              bg={"brand.500"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "brand.600",
              }}
              onClick={() => handleVerDetalles(habitacion)}
            >
              Ver Detalles
            </Button>
          </Box>
        ))}
      </SimpleGrid>

      {/* --- MODAL DETALLES --- */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform="capitalize">
            {selectedHabitacion?.title}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selectedHabitacion?.images?.length > 0 && (
              <Image
                src={selectedHabitacion.images[0]}
                borderRadius="md"
                mb={4}
                maxH="300px"
                w="100%"
                objectFit="cover"
              />
            )}

            <Heading size="sm" mb={2} color="brand.600">
              Descripción
            </Heading>
            <Text color="gray.600" mb={4}>
              {selectedHabitacion?.description}
            </Text>

            {/* AMENITIES (Lista de comodidades) */}
            {selectedHabitacion?.amenities && (
              <Box mb={6}>
                <Heading size="sm" mb={2} color="brand.600">
                  Comodidades
                </Heading>
                <SimpleGrid columns={2} spacing={2}>
                  {selectedHabitacion.amenities.map((amenity, index) => (
                    <Flex key={index} align="center">
                      <Icon as={FaCheckCircle} color="green.500" mr={2} />
                      <Text fontSize="sm">{amenity}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
            )}

            <Stack direction="row" mb={6} spacing={4}>
              <Badge colorScheme="blue" p={2} borderRadius="md">
                Capacidad: {selectedHabitacion?.capacity} Personas
              </Badge>
              <Badge
                colorScheme={selectedHabitacion?.isAvailable ? "green" : "red"}
                p={2}
                borderRadius="md"
              >
                {selectedHabitacion?.isAvailable
                  ? "Disponible"
                  : "No Disponible"}
              </Badge>
            </Stack>

            <Heading size="sm" mb={2}>
              Deja tu opinión
            </Heading>
            <Textarea
              placeholder="¿Qué te pareció esta habitación?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              focusBorderColor="brand.500"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button
              colorScheme="blue"
              bg="brand.500"
              onClick={handleSubmitReview}
            >
              Enviar Review
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Habitaciones;
