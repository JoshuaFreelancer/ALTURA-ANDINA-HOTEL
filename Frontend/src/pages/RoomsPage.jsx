import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

// Componentes
import RoomsCarousel from '../components/rooms/RoomsCarousel';
import RoomList from '../components/rooms/RoomList';
import OnSearch from '../utils/OnSearch';

const RoomsPage = () => {
  return (
    <Box pb={20} bg="gray.50">
      
      {/* 1. CARRUSEL HERO (Ancho completo, pero contenido centrado) */}
      <Box pt={{ base: 4, md: 8 }}>
        <RoomsCarousel />
      </Box>

      {/* 2. CONTENIDO PRINCIPAL */}
      <Container maxW="container.xl" mt={10}>
        
        {/* Encabezado de Sección */}
        <VStack spacing={4} textAlign="center" mb={10}>
          <Heading 
            as="h1" 
            size="2xl" 
            color="brand.600" 
            fontFamily="heading"
          >
            Encuentra tu Espacio Ideal
          </Heading>
          <Text fontSize="lg" color="gray.500" maxW="2xl">
            Desde suites ejecutivas hasta habitaciones familiares, explora nuestra selección y elige el confort que mereces.
          </Text>
        </VStack>

        {/* Barra de Búsqueda */}
        <Box mb={12}>
          <OnSearch />
        </Box>

        {/* Lista de Habitaciones */}
        <RoomList />
        
      </Container>
    </Box>
  );
};

export default RoomsPage;