import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCalendarAlt,
} from "react-icons/fa";

// --- IMPORT CORRECTO DEL HOOK ---
import { useData } from "../../hooks/useData";

import SpecialPromotions from "./Promotions.jsx";
import axios from "axios";

// Logo
import hotelLogo from "/assets/images/icon.png";

function ContactForm() {
  const { reservationData, resetReservation } = useData();
  const toast = useToast();

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

  // Cargar datos del contexto si vienen de la barra de reserva
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      toast({
        title: "Campos incompletos",
        description: "Por favor llena los campos obligatorios.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      toast({
        title: "Fechas inválidas",
        description: "La salida debe ser posterior a la entrada.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <div style="text-align: center;">
             <img src="${hotelLogo}" alt="Altura Andina" style="width: 80px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #2c5282; text-align: center;">Solicitud de Reserva</h2>
        <p>Hola <strong>${formData.name}</strong>,</p>
        <p>Gracias por elegir Altura Andina. Hemos recibido tu solicitud:</p>
        
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <ul style="list-style: none; padding: 0;">
            <li>📅 <strong>Del:</strong> ${formData.checkIn} <strong>Al:</strong> ${formData.checkOut}</li>
            <li>👥 <strong>Huéspedes:</strong> ${formData.adults} Adultos, ${formData.kids} Niños</li>
            <li>🛏️ <strong>Habitaciones:</strong> ${formData.rooms}</li>
          </ul>
        </div>
        <p><strong>Mensaje:</strong> ${formData.message || "Sin mensaje adicional"}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.9em; color: #718096; text-align: center;">Nos pondremos en contacto contigo en breve para confirmar disponibilidad y métodos de pago.</p>
      </div>
    `;

    try {
      await axios.post("http://localhost:5000/send-email", {
        email: formData.email,
        subject: `Nueva Solicitud: ${formData.name}`,
        html: emailHtml,
      });

      toast({
        title: "¡Solicitud Enviada!",
        description: "Revisa tu correo, te hemos enviado los detalles.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

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
    } catch (error) {
      console.error("Error envío:", error);
      toast({
        title: "Error de conexión",
        description: "No pudimos enviar la solicitud. Intenta más tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={{ base: 12 }} bg="gray.50" id="contacto">
      <Container maxW="container.xl">
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
            Completa el formulario y nos pondremos en contacto contigo para
            confirmar tu reserva.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={10}
          alignItems="start"
        >
          {/* --- COLUMNA IZQUIERDA: FORMULARIO (Ocupa 2 espacios) --- */}
          <Box gridColumn={{ lg: "span 2" }}>
            <Card bg={bgCard} shadow="xl" borderRadius="xl" overflow="hidden">
              <Box h="6px" bgGradient="linear(to-r, brand.400, brand.600)" />{" "}
              {/* Línea decorativa superior */}
              <CardBody p={{ base: 6, md: 10 }}>
                <VStack as="form" spacing={6} onSubmit={handleSubmit}>
                  {/* SECCIÓN 1: DATOS PERSONALES */}
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

                  {/* SECCIÓN 2: DATOS RESERVA */}
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
                      placeholder="Ej: Cuna para bebé, habitación en planta baja, alergias..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      focusBorderColor="brand.500"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    bg="brand.500"
                    size="lg"
                    w="full"
                    h="60px" // Botón más alto para mejor tacto
                    fontSize="lg"
                    isLoading={isSubmitting}
                    loadingText="Enviando Solicitud..."
                    rightIcon={<FaPaperPlane />}
                    _hover={{
                      bg: "brand.600",
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                    transition="all 0.2s"
                  >
                    Confirmar Solicitud
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </Box>

          {/* --- COLUMNA DERECHA: PROMOCIONES (Ocupa 1 espacio) --- */}
          {/* position="sticky" hace que el sidebar te siga al hacer scroll */}
          <Box
            gridColumn={{ lg: "span 1" }}
            position={{ lg: "sticky" }}
            top={{ lg: "100px" }}
          >
            <SpecialPromotions />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ContactForm;
