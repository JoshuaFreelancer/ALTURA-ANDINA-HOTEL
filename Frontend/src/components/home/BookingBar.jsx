import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Stack,
  Container,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaUser, FaChild, FaBed } from "react-icons/fa";

// Importamos el hook
import { useData } from "../../hooks/useData";

const BookingBar = () => {
  const { updateReservationData } = useData();
  const navigate = useNavigate();
  const toast = useToast();

  const [reservationData, setReservationData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    kids: 0,
    rooms: 1,
  });

  // --- LÓGICA DE FECHAS ---
  const today = new Date().toISOString().split("T")[0];

  const getMinCheckOutDate = () => {
    if (reservationData.checkIn) {
      const checkInDate = new Date(reservationData.checkIn);
      checkInDate.setDate(checkInDate.getDate() + 1);
      return checkInDate.toISOString().split("T")[0];
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "checkIn") {
      setReservationData((prev) => {
        if (prev.checkOut && value >= prev.checkOut) {
          return { ...prev, checkIn: value, checkOut: "" };
        }
        return { ...prev, checkIn: value };
      });
    } else {
      setReservationData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReserve = () => {
    // Validación
    if (!reservationData.checkIn || !reservationData.checkOut) {
      toast({
        title: "Faltan fechas",
        description: "Selecciona llegada y salida para continuar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    // 1. Guardar en contexto
    updateReservationData(reservationData);

    // 2. Feedback CLARO y POSITIVO
    toast({
      title: "¡Fechas seleccionadas!",
      description: "Te redirigimos para finalizar la reserva...",
      status: "success", // Verde = Éxito
      duration: 2000,
      isClosable: true,
      position: "top",
      variant: "subtle", // Un estilo más moderno
    });

    // 3. Redirección
    setTimeout(() => {
      navigate("/contacto");
    }, 1500);
  };

  return (
    <Container
      maxW="container.xl"
      // Ajustamos el margen negativo para que suba lo justo y necesario
      mt={{ base: 4, md: -16 }}
      position="relative"
      zIndex={20}
      px={4}
    >
      <Box
        bg="white"
        // Reducimos el padding (p) para hacer la barra más delgada verticalmente
        p={{ base: 5, md: 5 }}
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.100"
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: 4, lg: 4 }} // Espaciado más compacto
          align={{ lg: "flex-end" }}
          justify="center"
        >
          {/* --- INPUT CHECK-IN --- */}
          <FormControl id="check-in">
            <FormLabel
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.500"
              ml={1}
              mb={1}
            >
              Llegada
            </FormLabel>
            <InputGroup size="md">
              {" "}
              {/* Tamaño MD para reducir altura */}
              <InputLeftElement pointerEvents="none">
                <Icon as={FaCalendarAlt} color="brand.500" />{" "}
                {/* Color de marca */}
              </InputLeftElement>
              <Input
                type="date"
                name="checkIn"
                value={reservationData.checkIn}
                onChange={handleInputChange}
                min={today}
                focusBorderColor="brand.500"
                fontWeight="semibold"
                color="gray.700"
                fontSize="sm"
              />
            </InputGroup>
          </FormControl>

          {/* --- INPUT CHECK-OUT --- */}
          <FormControl id="check-out">
            <FormLabel
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.500"
              ml={1}
              mb={1}
            >
              Salida
            </FormLabel>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={FaCalendarAlt} color="brand.500" />
              </InputLeftElement>
              <Input
                type="date"
                name="checkOut"
                value={reservationData.checkOut}
                onChange={handleInputChange}
                min={getMinCheckOutDate()}
                disabled={!reservationData.checkIn}
                focusBorderColor="brand.500"
                fontWeight="semibold"
                color="gray.700"
                fontSize="sm"
                _disabled={{ bg: "gray.50", cursor: "not-allowed" }}
              />
            </InputGroup>
          </FormControl>

          {/* --- SELECTORES --- */}
          <Flex gap={3} w="100%">
            <FormControl id="adults">
              <FormLabel
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.500"
                ml={1}
                mb={1}
              >
                Adultos
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaUser} color="brand.500" />
                </InputLeftElement>
                <Select
                  name="adults"
                  value={reservationData.adults}
                  onChange={handleInputChange}
                  pl={9}
                  focusBorderColor="brand.500"
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  {[...Array(8).keys()].map((num) => (
                    <option key={num} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>

            <FormControl id="kids">
              <FormLabel
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.500"
                ml={1}
                mb={1}
              >
                Niños
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaChild} color="brand.500" />
                </InputLeftElement>
                <Select
                  name="kids"
                  value={reservationData.kids}
                  onChange={handleInputChange}
                  pl={9}
                  focusBorderColor="brand.500"
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  {[...Array(6).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
          </Flex>

          <FormControl id="rooms" maxW={{ lg: "140px" }}>
            {" "}
            {/* Ancho reducido */}
            <FormLabel
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.500"
              ml={1}
              mb={1}
            >
              Habitaciones
            </FormLabel>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={FaBed} color="brand.500" />
              </InputLeftElement>
              <Select
                name="rooms"
                value={reservationData.rooms}
                onChange={handleInputChange}
                pl={9}
                focusBorderColor="brand.500"
                fontWeight="semibold"
                fontSize="sm"
              >
                {[...Array(5).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormControl>

          {/* --- BOTÓN --- */}
          <Button
            colorScheme="brand"
            bg="brand.500"
            size="md" // Botón tamaño mediano para igualar inputs
            px={8}
            width={{ base: "100%", lg: "auto" }}
            onClick={handleReserve}
            _hover={{
              bg: "brand.600",
              transform: "translateY(-1px)",
              shadow: "md",
            }}
            transition="all 0.2s"
          >
            Reservar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default BookingBar;
