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
  Stack,
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
  Text, // <--- ¡AQUÍ FALTABA ESTE IMPORT!
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCalendarAlt,
  FaChild,
  FaBed,
} from "react-icons/fa";
import { useData } from "../hooks/DataContext.jsx";
import SpecialPromotions from "./SpecialPromotions.jsx";
import axios from "axios";

// Logo (Asegúrate de que la ruta sea correcta)
import hotelLogo from "/assets/images/icon.png";

function ContactForm() {
  const { reservationData, resetReservation } = useData();
  const toast = useToast();

  // Colores del tema
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

  // EFECTO: Cargar datos del contexto al iniciar
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (
      !formData.name ||
      !formData.email ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      toast({
        title: "Fechas inválidas",
        description: "La fecha de salida debe ser posterior a la entrada.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Construcción del HTML para el correo (Template String)
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <div style="text-align: center;">
             <img src="${hotelLogo}" alt="Altura Andina" style="width: 100px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #2c5282; text-align: center;">Confirmación de Solicitud</h2>
        <p>Hola <strong>${formData.name}</strong>,</p>
        <p>Hemos recibido tu solicitud de reserva. Nuestro equipo verificará la disponibilidad y te contactará pronto.</p>
        
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detalles de la Reserva:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Entrada:</strong> ${formData.checkIn}</li>
            <li><strong>Salida:</strong> ${formData.checkOut}</li>
            <li><strong>Adultos:</strong> ${formData.adults} | <strong>Niños:</strong> ${formData.kids}</li>
            <li><strong>Habitaciones:</strong> ${formData.rooms}</li>
          </ul>
        </div>
        
        <p style="font-size: 0.9em; color: #718096;">Este es un correo automático. Por favor no respondas a esta dirección.</p>
      </div>
    `;

    try {
      await axios.post("http://localhost:5000/send-email", {
        email: formData.email,
        subject: "Solicitud de Reserva - Altura Andina",
        html: emailHtml,
      });

      toast({
        title: "¡Solicitud enviada!",
        description:
          "Te hemos enviado un correo de confirmación. Revisa tu bandeja.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Limpiar formulario y contexto
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
      resetReservation(); // Función nueva del contexto
    } catch (error) {
      console.error("Error envío:", error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema con el servidor. Intenta nuevamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.100" id="contacto">
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={12}
          color="brand.600"
          fontFamily="heading"
        >
          Reserva tu Estadía
        </Heading>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <Card bg={bgCard} shadow="xl" borderRadius="xl">
            <CardBody p={{ base: 6, md: 8 }}>
              <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                <Heading size="md" alignSelf="start" color="brand.500" mb={2}>
                  Datos del Huésped
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Nombre Completo</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Icon as={FaUser} color="gray.400" />}
                      />
                      <Input
                        name="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Icon as={FaEnvelope} color="gray.400" />}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                {/* FECHAS */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Check-In</FormLabel>
                    <Input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Check-Out</FormLabel>
                    <Input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </SimpleGrid>

                {/* SELECTORES DE PERSONAS */}
                <HStack w="100%" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Adultos</FormLabel>
                    <Select
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                    >
                      {[...Array(8).keys()].map((i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Niños</FormLabel>
                    <Select
                      name="kids"
                      value={formData.kids}
                      onChange={handleInputChange}
                    >
                      {[...Array(6).keys()].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Habitaciones</FormLabel>
                    <Select
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
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
                  <FormLabel>Mensaje Especial (Opcional)</FormLabel>
                  <Textarea
                    name="message"
                    placeholder="¿Alguna petición especial?"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  bg="brand.500"
                  size="lg"
                  w="full"
                  mt={4}
                  isLoading={isSubmitting}
                  loadingText="Enviando..."
                  rightIcon={<FaPaperPlane />}
                  _hover={{
                    bg: "brand.600",
                    transform: "translateY(-2px)",
                    shadow: "lg",
                  }}
                >
                  Confirmar Solicitud
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* COLUMNA DERECHA: PROMOCIONES */}
          <Box>
            <SpecialPromotions />

            {/* Información de contacto extra */}
            <Box
              mt={8}
              p={6}
              bg="brand.600"
              borderRadius="xl"
              color="white"
              shadow="lg"
            >
              <Heading size="md" mb={4}>
                ¿Necesitas ayuda inmediata?
              </Heading>
              <Stack spacing={3}>
                <Text>📞 +58 274 555 1234</Text>
                <Text>📧 reservas@alturaandina.com</Text>
                <Text>📍 Av. Principal, Mérida, Venezuela</Text>
              </Stack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ContactForm;
