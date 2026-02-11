import { useState } from "react";
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
  Center,
  SimpleGrid as GridAmenities,
} from "@chakra-ui/react";
import { FaUserFriends, FaImages, FaCheckCircle, FaStar } from "react-icons/fa";
import { useRooms } from "../../hooks/useRooms";
import Loader from "../common/Loader";

const RoomList = () => {
  const { filteredHabitaciones, loading } = useRooms();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const bgCard = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const headingColor = useColorModeValue("gray.700", "white");

  const handleVerDetalles = (habitacion) => {
    setSelectedHabitacion(habitacion);
    onOpen();
  };

  const handleSubmitReview = () => {
    // Lógica futura para enviar review
    setReviewText("");
    onClose();
  };

  if (loading) return <Loader text="Cargando catálogo..." />;

  if (!filteredHabitaciones || filteredHabitaciones.length === 0) {
    return (
      <Center h="200px" bg="gray.100" borderRadius="md">
        <Text fontSize="lg" color="gray.500">
          No hay habitaciones que coincidan con tu búsqueda.
        </Text>
      </Center>
    );
  }

  // NOTA: Eliminamos el Container wrapper. Ahora renderiza directo el Grid.
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredHabitaciones.map((habitacion) => (
          <Box
            key={habitacion._id}
            bg={bgCard}
            boxShadow="xl"
            rounded="xl" // Bordes un poco más suaves
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
            border="1px solid"
            borderColor="gray.100"
          >
            {/* IMAGEN */}
            <Box h="220px" bg="gray.100" pos="relative" overflow="hidden">
              {habitacion.images && habitacion.images.length > 0 ? (
                <Image
                  src={habitacion.images[0]}
                  alt={habitacion.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  transition="transform 0.5s"
                  _hover={{ transform: "scale(1.1)" }} // Efecto zoom interno
                />
              ) : (
                <Center h="100%">
                  <Icon as={FaImages} boxSize={10} color="gray.400" />
                </Center>
              )}
              {/* Badge de precio flotante */}
              <Badge
                position="absolute"
                top={4}
                right={4}
                bg="white"
                color="brand.600"
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="md"
              >
                ${habitacion.pricePerNight}
              </Badge>
            </Box>

            {/* CONTENIDO */}
            <Stack p={6} spacing={3}>
              <Flex justify="space-between" align="center">
                <Text
                  color="brand.500"
                  fontWeight="bold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {habitacion.roomType}
                </Text>
                {habitacion.averageRating && (
                  <Flex align="center">
                    <Icon as={FaStar} color="yellow.400" w={3} h={3} mr={1} />
                    <Text fontSize="xs" fontWeight="bold">
                      {habitacion.averageRating}
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Heading
                color={headingColor}
                fontSize="xl"
                fontFamily="body"
                noOfLines={1}
              >
                {habitacion.title}
              </Heading>

              <Text color={textColor} fontSize="sm" noOfLines={2}>
                {habitacion.description}
              </Text>

              <Flex align="center" color="gray.500" fontSize="sm">
                <Icon as={FaUserFriends} mr={2} color="brand.400" />
                <Text>Hasta {habitacion.capacity} personas</Text>
              </Flex>

              <Button
                mt={4}
                w="full"
                colorScheme="brand"
                variant="outline"
                _hover={{ bg: "brand.500", color: "white" }}
                onClick={() => handleVerDetalles(habitacion)}
              >
                Ver Detalles
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      {/* MODAL (Sin cambios funcionales, solo estilo) */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader fontFamily="heading" color="brand.600">
            {selectedHabitacion?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedHabitacion?.images?.length > 0 && (
              <Image
                src={selectedHabitacion.images[0]}
                borderRadius="lg"
                mb={6}
                w="100%"
                maxH="350px"
                objectFit="cover"
                shadow="md"
              />
            )}

            <Stack spacing={4}>
              <Box>
                <Heading size="sm" mb={2} color="brand.500">
                  Descripción
                </Heading>
                <Text color="gray.600" lineHeight="tall">
                  {selectedHabitacion?.description}
                </Text>
              </Box>

              {selectedHabitacion?.amenities && (
                <Box>
                  <Heading size="sm" mb={3} color="brand.500">
                    Comodidades
                  </Heading>
                  <GridAmenities columns={2} spacing={3}>
                    {selectedHabitacion.amenities.map((amenity, index) => (
                      <Flex
                        key={index}
                        align="center"
                        bg="gray.50"
                        p={2}
                        borderRadius="md"
                      >
                        <Icon as={FaCheckCircle} color="green.400" mr={3} />
                        <Text fontSize="sm" color="gray.700">
                          {amenity}
                        </Text>
                      </Flex>
                    ))}
                  </GridAmenities>
                </Box>
              )}
            </Stack>

            <Box mt={6}>
              <Textarea
                placeholder="Escribe tu reseña..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                focusBorderColor="brand.500"
                bg="gray.50"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="brand"
              bg="brand.500"
              onClick={handleSubmitReview}
            >
              Enviar Opinión
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomList;
