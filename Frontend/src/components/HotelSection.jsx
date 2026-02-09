import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Container, 
  SimpleGrid, 
  Image 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Creamos un Box animado para envolver el texto
const MotionBox = motion(Box);

const HotelSection = () => {
  return (
    <Box as="section" bg="gray.50" py={{ base: 12, md: 20 }} id="hotel-section">
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          
          {/* --- COLUMNA DE TEXTO --- */}
          <MotionBox
            // Animación: Entra desde la izquierda (-50px) y aparece
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }} // Se activa cuando haces scroll y lo ves
            viewport={{ once: true, amount: 0.5 }} // Se anima una sola vez
            transition={{ duration: 0.8 }}
          >
            <Heading 
              as="h2" 
              size="2xl" 
              mb={6} 
              color="brand.600" 
              fontFamily="heading"
            >
              Bienvenido a Altura Andina
            </Heading>
            
            <Heading 
              as="h3" 
              size="md" 
              mb={4} 
              color="brand.500" 
              fontWeight="medium"
            >
              Descubre una experiencia única en el corazón de Mérida
            </Heading>

            <Text fontSize="lg" color="gray.600" lineHeight="tall" textAlign="justify">
              El Altura Andina Hotel & Spa es un lugar de ensueño ubicado en el corazón 
              de la hermosa ciudad de Mérida. Con vistas espectaculares y servicio excepcional, 
              te invitamos a desconectar de la rutina y conectar con la naturaleza sin perder 
              el confort que mereces.
            </Text>
          </MotionBox>

          {/* --- COLUMNA DE IMAGEN --- */}
          <Box
            borderRadius="2xl"
            boxShadow="2xl"
            overflow="hidden"
            height={{ base: "300px", md: "400px" }}
          >
            <Image 
              src="/assets/images/Hotel.png" // Asegúrate de que la ruta empiece con /
              alt="Hotel Altura Andina" 
              w="100%" 
              h="100%" 
              objectFit="cover"
              transition="transform 0.5s ease"
              _hover={{ transform: 'scale(1.05)' }} // Efecto zoom suave al pasar el mouse
            />
          </Box>

        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default HotelSection;