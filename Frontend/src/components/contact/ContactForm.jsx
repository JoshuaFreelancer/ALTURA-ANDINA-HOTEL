import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  useToast,
  VStack,
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Card,
  CardBody,
  Text,
  useDisclosure, // Importamos esto para manejar el Modal
  Divider,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard, // Icono para el pago
  FaHotel, // Icono para pago en hotel
} from "react-icons/fa";

// --- IMPORTS ---
import { useData } from "../../hooks/useData";
import hotelApi from "../../services/api";
import SpecialPromotions from "./Promotions.jsx";
// Importamos el Modal de Pago que creamos anteriormente
// Ajusta la ruta si guardaste el archivo en otro lado
import PaymentModal from "../payment/PaymentModal";

function ContactForm() {
  const { reservationData, resetReservation } = useData();
  const toast = useToast();

  // Hook para controlar el Modal de Stripe
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgCard = useColorModeValue("white", "gray.700");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    kids: 0,
    rooms: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (reservationData.checkIn) {
      setFormData((prev) => ({
        ...prev,
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut,
        adults: reservationData.adults,
        kids: reservationData.kids,
        rooms: reservationData.rooms,
      }));
    }
  }, [reservationData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- FUNCIÓN DE VALIDACIÓN (Para no repetir código) ---
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      toast({
        title: "Campos incompletos",
        description:
          "Por favor completa los datos obligatorios antes de continuar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (formData.checkOut <= formData.checkIn) {
      toast({
        title: "Fechas inválidas",
        description: "La salida debe ser posterior a la entrada.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  // --- OPCIÓN A: PAGO EN HOTEL (Solo Email) ---
  const handlePayAtHotel = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await sendConfirmationEmail("Nueva Solicitud (Pago en Hotel)");

      toast({
        title: "¡Solicitud Enviada!",
        description: "Tu reserva está pre-confirmada. Pagarás al llegar.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      handleReset();
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- OPCIÓN B: PAGAR AHORA (Abre Modal Stripe) ---
  const handleOpenPayment = () => {
    if (validateForm()) {
      onOpen(); // Abrimos el modal solo si el formulario está válido
    }
  };

  // --- CALLBACK: Cuando Stripe confirma el pago ---
  const handlePaymentSuccess = async () => {
    onClose(); // Cerramos modal
    setIsSubmitting(true); // Ponemos loading mientras mandamos el correo

    try {
      // Enviamos correo con asunto diferente
      await sendConfirmationEmail("¡Reserva Confirmada y PAGADA! ✅");

      toast({
        title: "¡Pago Exitoso!",
        description: "Hemos recibido tu pago. Tu habitación está asegurada.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
      });

      handleReset();
    } catch (error) {
      // Si el pago pasó pero el correo falló, avisamos
      console.error(error);
      toast({
        title: "Pago recibido, pero hubo un error con el correo",
        description: "Por favor guarda tu comprobante de Stripe.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- UTILIDAD: Enviar Correo ---
  const sendConfirmationEmail = async (subjectLine) => {
    await hotelApi.post("/services/email", {
      email: formData.email,
      subject: `${subjectLine} - ${formData.name}`,
      name: formData.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      adults: formData.adults,
      kids: formData.kids,
      rooms: formData.rooms,
      message: formData.message,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      checkIn: "",
      checkOut: "",
      adults: 1,
      kids: 0,
      rooms: 1,
    });
    resetReservation();
  };

  const handleError = (error) => {
    console.error("Error envío:", error);
    toast({
      title: "Error de conexión",
      description: "Intenta nuevamente.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box py={{ base: 12 }} bg="gray.50" id="contacto">
      <Container maxW="container.xl">
        {/* ... Header del formulario (igual) ... */}
        <VStack spacing={2} mb={12} textAlign="center">
          <Text
            color="brand.500"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="sm"
          >
            Comienza tu aventura
          </Text>
          <Heading as="h2" size="2xl" color="brand.600" fontFamily="heading">
            Reserva tu Estadía
          </Heading>
          <Text fontSize="lg" color="gray.500" maxW="2xl">
            Elige tu método de preferencia: asegura tu reserva pagando ahora o
            solicita pagar en recepción.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={10}
          alignItems="start"
        >
          <Box gridColumn={{ lg: "span 2" }}>
            <Card bg={bgCard} shadow="xl" borderRadius="xl" overflow="hidden">
              <Box h="6px" bgGradient="linear(to-r, brand.400, brand.600)" />
              <CardBody p={{ base: 6, md: 10 }}>
                <VStack as="form" spacing={6}>
                  {/* ... (Tus inputs de Información Personal y Detalles del Viaje se mantienen IGUAL) ... */}
                  {/* ... Solo copiamos la estructura para ahorrar espacio, asumo que están aquí ... */}

                  <Heading
                    size="sm"
                    alignSelf="start"
                    color="gray.500"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    w="full"
                    pb={2}
                  >
                    Información Personal
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="bold">
                        Nombre Completo
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          children={<Icon as={FaUser} color="gray.400" />}
                        />
                        <Input
                          name="name"
                          placeholder="Ej: Juan Pérez"
                          value={formData.name}
                          onChange={handleInputChange}
                          focusBorderColor="brand.500"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="bold">
                        Correo Electrónico
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          children={<Icon as={FaEnvelope} color="gray.400" />}
                        />
                        <Input
                          name="email"
                          type="email"
                          placeholder="ejemplo@correo.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          focusBorderColor="brand.500"
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <Heading
                    size="sm"
                    alignSelf="start"
                    color="gray.500"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    w="full"
                    pb={2}
                    pt={4}
                  >
                    Detalles del Viaje
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="bold">
                        Llegada
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          children={
                            <Icon as={FaCalendarAlt} color="gray.400" />
                          }
                        />
                        <Input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          focusBorderColor="brand.500"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="bold">
                        Salida
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          children={
                            <Icon as={FaCalendarAlt} color="gray.400" />
                          }
                        />
                        <Input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          focusBorderColor="brand.500"
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <HStack w="100%" spacing={4}>
                    <FormControl>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        Adultos
                      </FormLabel>
                      <Select
                        name="adults"
                        value={formData.adults}
                        onChange={handleInputChange}
                        focusBorderColor="brand.500"
                      >
                        {[...Array(8).keys()].map((i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        Niños
                      </FormLabel>
                      <Select
                        name="kids"
                        value={formData.kids}
                        onChange={handleInputChange}
                        focusBorderColor="brand.500"
                      >
                        {[...Array(6).keys()].map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        Habs.
                      </FormLabel>
                      <Select
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleInputChange}
                        focusBorderColor="brand.500"
                      >
                        {[...Array(5).keys()].map((i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                      Peticiones Especiales
                    </FormLabel>
                    <Textarea
                      name="message"
                      placeholder="Ej: Cuna para bebé, habitación en planta baja..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      focusBorderColor="brand.500"
                    />
                  </FormControl>

                  {/* --- ZONA DE BOTONES DE ACCIÓN --- */}
                  <VStack w="full" spacing={3} pt={4}>
                    {/* Opción 1: Pagar Ahora (Stripe) */}
                    <Button
                      onClick={handleOpenPayment}
                      colorScheme="green"
                      bg="brand.500"
                      size="lg"
                      w="full"
                      h="60px"
                      fontSize="lg"
                      leftIcon={<FaCreditCard />}
                      _hover={{
                        bg: "brand.600",
                        transform: "translateY(-2px)",
                        shadow: "lg",
                      }}
                    >
                      Pagar Ahora y Reservar
                    </Button>

                    <HStack w="full" align="center">
                      <Divider />
                      <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">
                        O reservar sin pagar
                      </Text>
                      <Divider />
                    </HStack>

                    {/* Opción 2: Pagar en Hotel (Email) */}
                    <Button
                      onClick={handlePayAtHotel}
                      variant="outline"
                      colorScheme="brand"
                      size="lg"
                      w="full"
                      h="50px"
                      fontSize="md"
                      isLoading={isSubmitting}
                      loadingText="Enviando..."
                      leftIcon={<FaHotel />}
                      _hover={{ bg: "brand.50", borderColor: "brand.500" }}
                    >
                      Pagar en Recepción
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </Box>

          <Box
            gridColumn={{ lg: "span 1" }}
            position={{ lg: "sticky" }}
            top={{ lg: "100px" }}
          >
            <SpecialPromotions />
          </Box>
        </SimpleGrid>

        {/* --- MODAL DE PAGO STRIPE --- */}
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          bookingData={formData}
          onSuccess={handlePaymentSuccess}
        />
      </Container>
    </Box>
  );
}

export default ContactForm;
