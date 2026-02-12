import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Image,
  Stack,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const AboutImage = "https://res.cloudinary.com/drfyy4i0s/image/upload/v1770903399/About_c6ozea.png";

const About = () => {
  const bgSection = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("brand.500", "brand.300");

  return (
    <Box as="section" bg={bgSection} py={{ base: 16, md: 24 }} id="about">
      <Container maxW="container.xl">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={16}
          alignItems="center"
        >
          {/* --- COLUMNA DE IMAGEN (Ahora a la izquierda en Desktop para variar el ritmo visual) --- */}
          <Box position="relative" order={{ base: 2, lg: 1 }}>
            {/* Elemento decorativo detrás de la imagen */}
            <Box
              position="absolute"
              top="-20px"
              left="-20px"
              w="100%"
              h="100%"
              bg="brand.100"
              borderRadius="2xl"
              zIndex={0}
            />

            <MotionImage
              src={AboutImage}
              alt="Vista del Hotel Altura Andina frente a la Sierra Nevada"
              borderRadius="2xl"
              boxShadow="2xl"
              position="relative"
              zIndex={1}
              w="100%"
              h={{ base: "300px", md: "500px" }}
              objectFit="cover"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </Box>

          {/* --- COLUMNA DE TEXTO --- */}
          <MotionBox
            order={{ base: 1, lg: 2 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Stack spacing={6}>
              <Stack direction="row" align="center">
                <Icon as={FaMapMarkerAlt} color={accentColor} />
                <Text
                  color={accentColor}
                  fontWeight="bold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  fontSize="sm"
                >
                  Mérida, Venezuela
                </Text>
              </Stack>

              <Heading
                as="h2"
                size="2xl"
                fontFamily="heading"
                color="brand.600"
                lineHeight="shorter"
              >
                Bienvenido a <br />
                <Text as="span" color="brand.500">
                  Altura Andina
                </Text>
              </Heading>

              <Text fontSize="xl" color="gray.500" fontWeight="medium">
                Donde la elegancia se encuentra con la majestuosidad de la
                Sierra Nevada.
              </Text>

              <Text
                fontSize="md"
                color="gray.600"
                lineHeight="tall"
                textAlign="justify"
              >
                Ubicado a los pies del imponente Pico Bolívar, Altura Andina es
                mucho más que un hotel; es un refugio diseñado para conectar tus
                sentidos con la naturaleza. Despierta cada mañana con la brisa
                fresca de los Andes y disfruta de una vista panorámica
                inigualable del teleférico más alto del mundo.
              </Text>

              <Text
                fontSize="md"
                color="gray.600"
                lineHeight="tall"
                textAlign="justify"
              >
                Combinamos la arquitectura colonial merideña con el confort
                moderno para ofrecerte una estadía inolvidable, ya sea que
                busques aventura en la montaña o relajación total en nuestro
                Spa.
              </Text>

              <Box pt={4}>
                <Button
                  as={NavLink}
                  to="/servicios"
                  rightIcon={<FaArrowRight />}
                  colorScheme="brand"
                  bg="brand.500"
                  size="lg"
                  _hover={{ bg: "brand.600", color: "white" }}
                >
                  Explora nuestros servicios
                </Button>
              </Box>
            </Stack>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default About;
