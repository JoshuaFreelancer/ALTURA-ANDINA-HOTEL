import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Icon
} from '@chakra-ui/react';
import { FaCalendarAlt, FaUser, FaChild, FaBed } from 'react-icons/fa';
import { useData } from '../hooks/DataContext';

const ReservationBar = () => {
  const { updateReservationData } = useData();
  const navigate = useNavigate();
  const toast = useToast(); // Hook de notificaciones de Chakra (Reemplaza Snackbar)

  const [reservationData, setReservationData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    kids: 0,
    rooms: 1
  });

  // --- LÓGICA DE VALIDACIÓN ---
  // Calculamos esto en tiempo real, sin useEffects innecesarios.
  const isValidDate = reservationData.checkIn && reservationData.checkOut && reservationData.checkOut > reservationData.checkIn;
  
  // Fecha mínima para el check-in (Hoy)
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReserve = () => {
    if (!isValidDate) return;

    // 1. Actualizamos el contexto global
    updateReservationData(reservationData);

    // 2. Feedback visual (Toast)
    toast({
      title: "Disponibilidad consultada",
      description: "Redirigiendo al formulario de contacto para finalizar...",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    // 3. Reset local (opcional, ya que nos vamos de la página)
    /* setReservationData({ ... }); */

    // 4. Redirección
    setTimeout(() => {
      navigate('/contacto');
    }, 2000);
  };

  return (
    <Container maxW="container.xl" mt={{ base: 4, md: -16 }} position="relative" zIndex={20} px={4}>
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.100"
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }} // Columna en móvil, Fila en PC
          spacing={4}
          align={{ lg: "flex-end" }} // Alinea los inputs con el botón abajo
          justify="center"
        >
          {/* --- INPUTS DE FECHA --- */}
          <FormControl id="check-in">
            <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">Entrada</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none"><Icon as={FaCalendarAlt} color="gray.400" /></InputLeftElement>
              <Input
                type="date"
                name="checkIn"
                value={reservationData.checkIn}
                onChange={handleInputChange}
                min={today} // No se puede reservar en el pasado
                focusBorderColor="brand.500"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="check-out">
            <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">Salida</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none"><Icon as={FaCalendarAlt} color="gray.400" /></InputLeftElement>
              <Input
                type="date"
                name="checkOut"
                value={reservationData.checkOut}
                onChange={handleInputChange}
                min={reservationData.checkIn || today} // Salida debe ser después de entrada
                focusBorderColor="brand.500"
              />
            </InputGroup>
          </FormControl>

          {/* --- SELECTORES --- */}
          <Flex gap={4} w="100%">
            <FormControl id="adults">
              <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">Adultos</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none"><Icon as={FaUser} color="gray.400" /></InputLeftElement>
                <Select
                  name="adults"
                  value={reservationData.adults}
                  onChange={handleInputChange}
                  pl={8} // Espacio para el icono
                  focusBorderColor="brand.500"
                >
                  {[...Array(8).keys()].map((num) => (
                    <option key={num} value={num + 1}>{num + 1}</option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>

            <FormControl id="kids">
              <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">Niños</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none"><Icon as={FaChild} color="gray.400" /></InputLeftElement>
                <Select
                  name="kids"
                  value={reservationData.kids}
                  onChange={handleInputChange}
                  pl={8}
                  focusBorderColor="brand.500"
                >
                  {[...Array(6).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
          </Flex>

           <FormControl id="rooms" maxW={{ lg: "150px" }}>
              <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">Habitaciones</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none"><Icon as={FaBed} color="gray.400" /></InputLeftElement>
                <Select
                  name="rooms"
                  value={reservationData.rooms}
                  onChange={handleInputChange}
                  pl={8}
                  focusBorderColor="brand.500"
                >
                  {[...Array(5).keys()].map((num) => (
                    <option key={num} value={num + 1}>{num + 1}</option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>

          {/* --- BOTÓN DE ACCIÓN --- */}
          <Button
            colorScheme="brand" // Usará tu color brand.500 definido en el tema
            bg="brand.500"
            size="lg"
            px={8}
            width={{ base: "100%", lg: "auto" }} // Ancho completo en móvil
            onClick={handleReserve}
            isDisabled={!isValidDate} // Deshabilitado nativo de Chakra
            _hover={{ bg: "brand.600", transform: "translateY(-2px)", shadow: "lg" }}
            transition="all 0.2s"
          >
            Reservar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ReservationBar;