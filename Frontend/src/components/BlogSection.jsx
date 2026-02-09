import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Container,
  Link,
  List,
  ListItem,
  ListIcon,
  Stack,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaSuitcase, 
  FaCameraRetro, 
  FaUtensils, 
  FaCalendarAlt 
} from 'react-icons/fa';

// Creamos un Box animado para envolver las tarjetas
const MotionBox = motion(Box);

const BlogSection = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const hoverShadow = useColorModeValue('xl', 'dark-lg');

  // --- CONFIGURACIÓN DE ANIMACIÓN (Cascada) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Retraso de 0.2s entre cada hijo
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box as="section" py={{ base: 12, md: 20 }} bg="gray.50" id="blog-section">
      <Container maxW="container.xl">
        <Heading 
          as="h2" 
          size="2xl" 
          textAlign="center" 
          mb={12} 
          color="brand.600" 
          fontFamily="heading"
        >
          ¡Explora Mérida!
        </Heading>

        {/* Contenedor animado que orquesta la cascada */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            
            {/* --- CARD 1: ARTÍCULOS --- */}
            <MotionBox 
              variants={itemVariants} 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg" 
              _hover={{ transform: 'translateY(-5px)', boxShadow: hoverShadow }} 
              transition="all 0.3s"
            >
              <Stack spacing={4} h="100%" justify="space-between">
                <Box>
                  <Heading size="md" color="brand.500" mb={2}>Artículos de Turismo</Heading>
                  <Text color="gray.600">
                    Descubre los mejores lugares para visitar en Mérida, desde el teleférico más alto del mundo hasta los coloridos pueblos del páramo.
                  </Text>
                </Box>
                <Link 
                  href="https://www.tripadvisor.com.ve/Attractions-g316050-Activities-Merida_Andean_Region.html" 
                  isExternal 
                  color="blue.500" 
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  _hover={{ textDecoration: 'none', color: 'blue.600' }}
                >
                  Ver en TripAdvisor <Icon as={FaExternalLinkAlt} ml={2} w={3} h={3} />
                </Link>
              </Stack>
            </MotionBox>

            {/* --- CARD 2: CONSEJOS (Lista) --- */}
            <MotionBox 
              variants={itemVariants} 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg" 
              _hover={{ transform: 'translateY(-5px)', boxShadow: hoverShadow }} 
              transition="all 0.3s"
            >
              <Stack spacing={4}>
                <Heading size="md" color="brand.500">Consejos de Viaje</Heading>
                <Text color="gray.600" fontSize="sm">
                  Tips esenciales de los locales para disfrutar tu estadía al máximo:
                </Text>
                <List spacing={3} color="gray.600">
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={FaSuitcase} color="brand.400" />
                    Lleva abrigo y ropa cómoda.
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={FaCameraRetro} color="brand.400" />
                    Respeta la cultura local.
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={FaUtensils} color="brand.400" />
                    Prueba la gastronomía típica.
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={FaCalendarAlt} color="brand.400" />
                    Reserva tours con tiempo.
                  </ListItem>
                </List>
              </Stack>
            </MotionBox>

            {/* --- CARD 3: GUÍAS --- */}
            <MotionBox 
              variants={itemVariants} 
              bg={cardBg} 
              p={6} 
              borderRadius="xl" 
              boxShadow="lg" 
              _hover={{ transform: 'translateY(-5px)', boxShadow: hoverShadow }} 
              transition="all 0.3s"
            >
              <Stack spacing={4} h="100%" justify="space-between">
                <Box>
                  <Heading size="md" color="brand.500" mb={2}>Guías Turísticas</Heading>
                  <Text color="gray.600">
                    Accede a guías completas y actualizadas sobre rutas de senderismo, posadas históricas y eventos culturales en la región.
                  </Text>
                </Box>
                <Link 
                  href="https://www.venezuelatuya.com/andes/guia_turistica_de_merida.htm" 
                  isExternal 
                  color="blue.500" 
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  _hover={{ textDecoration: 'none', color: 'blue.600' }}
                >
                  Ver guía completa <Icon as={FaExternalLinkAlt} ml={2} w={3} h={3} />
                </Link>
              </Stack>
            </MotionBox>

          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default BlogSection;