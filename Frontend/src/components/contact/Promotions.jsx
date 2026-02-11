import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  useColorModeValue,
  Flex,
  VStack,
  Stack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaPercentage,
  FaCoffee,
  FaMapMarkedAlt,
  FaParking,
  FaShuttleVan,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const MotionBox = motion(Box);

const Promotions = () => {
  const bgCard = useColorModeValue("white", "gray.800");
  const promoColor = "brand.500";
  const discountColor = "red.500";

  // Lista de Beneficios
  const benefits = [
    {
      text: "20% OFF en reserva anticipada (+30 días).",
      icon: FaPercentage,
      color: discountColor,
    },
    {
      text: "Desayuno Andino Buffet incluido.",
      icon: FaCoffee,
      color: promoColor,
    },
    {
      text: "Tour guiado por el casco histórico.",
      icon: FaMapMarkedAlt,
      color: promoColor,
    },
    {
      text: "Estacionamiento privado 24/7.",
      icon: FaParking,
      color: promoColor,
    },
    {
      text: "Traslado gratuito al Teleférico.",
      icon: FaShuttleVan,
      color: promoColor,
    },
  ];

  // Configuración de animación
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* --- TARJETA 1: PROMOCIONES --- */}
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        bg={bgCard}
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        borderTop="4px solid"
        borderColor="brand.500"
      >
        <Flex align="center" mb={6}>
          <Icon as={FaPercentage} color="brand.500" w={6} h={6} mr={3} />
          <Heading size="md" fontFamily="heading" color="brand.600">
            Beneficios Directos
          </Heading>
        </Flex>

        <List spacing={4}>
          {benefits.map((item, index) => (
            <ListItem key={index} display="flex" alignItems="start">
              <ListIcon as={item.icon} color={item.color} mt={1} />
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                {item.text}
              </Text>
            </ListItem>
          ))}
        </List>
      </MotionBox>

      {/* --- TARJETA 2: CONTACTO DIRECTO --- */}
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        bg="brand.600" // Fondo oscuro para destacar
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        color="white"
        position="relative"
        overflow="hidden"
      >
        {/* Decoración de fondo */}
        <Box
          position="absolute"
          top="-20px"
          right="-20px"
          w="100px"
          h="100px"
          bg="whiteAlpha.100"
          borderRadius="full"
        />

        <Heading size="md" mb={6} fontFamily="heading">
          ¿Necesitas ayuda inmediata?
        </Heading>

        <Stack spacing={5}>
          <Flex align="center">
            <Icon as={FaPhoneAlt} w={5} h={5} mr={4} color="brand.200" />
            <Box>
              <Text fontSize="xs" color="brand.200" textTransform="uppercase">
                Llámanos
              </Text>
              <Text fontWeight="bold">+58 274 555 1234</Text>
            </Box>
          </Flex>

          <Divider borderColor="whiteAlpha.300" />

          <Flex align="center">
            <Icon as={FaEnvelope} w={5} h={5} mr={4} color="brand.200" />
            <Box>
              <Text fontSize="xs" color="brand.200" textTransform="uppercase">
                Escríbenos
              </Text>
              <Text fontWeight="bold">reservas@alturaandina.com</Text>
            </Box>
          </Flex>

          <Divider borderColor="whiteAlpha.300" />

          <Flex align="start">
            <Icon
              as={FaMapMarkerAlt}
              w={5}
              h={5}
              mr={4}
              mt={1}
              color="brand.200"
            />
            <Box>
              <Text fontSize="xs" color="brand.200" textTransform="uppercase">
                Visítanos
              </Text>
              <Text fontWeight="bold" lineHeight="short">
                Av. Principal, Sector Las Heroínas,
                <br />
                Mérida, Venezuela.
              </Text>
            </Box>
          </Flex>
        </Stack>
      </MotionBox>
    </VStack>
  );
};

export default Promotions;
