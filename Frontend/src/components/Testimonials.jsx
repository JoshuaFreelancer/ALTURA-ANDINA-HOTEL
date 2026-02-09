import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Avatar, 
  Stack, 
  Container, 
  Button, 
  SimpleGrid, 
  useColorModeValue, 
  Icon,
  Flex
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Creamos un Box animado
const MotionBox = motion(Box);

// Datos de testimonios
const TESTIMONIALS = [
  {
    quote: "¡Una experiencia increíble! El personal muy amable. Definitivamente volveré.",
    author: "Juan Pérez",
    role: "Viajero de Negocios",
    image: "/assets/images/client1.jpg"
  },
  {
    quote: "Pasamos unas vacaciones maravillosas. La ubicación frente a las montañas es perfecta.",
    author: "María González",
    role: "Turista",
    image: "/assets/images/client2.jpg"
  },
  {
    quote: "El servicio es excepcional. Todos muy atentos a nuestras necesidades desde que llegamos.",
    author: "Carlos Rodríguez",
    role: "Familia",
    image: "/assets/images/client3.jpg"
  },
  {
    quote: "Excelente hotel con instalaciones de primera clase. El Spa es imperdible.",
    author: "Ana Martínez",
    role: "Pareja",
    image: "/assets/images/client4.jpg"
  },
  {
    quote: "Una estancia muy agradable. Las habitaciones son amplias, limpias y muy cómodas.",
    author: "Luis Hernández",
    role: "Aventurero",
    image: "/assets/images/client5.jpg"
  },
];

const Testimonials = () => {
  const [showMore, setShowMore] = useState(false);
  
  // Colores del tema
  const bgSection = useColorModeValue('gray.50', 'gray.900');
  const bgCard = useColorModeValue('white', 'gray.800');
  const quoteColor = useColorModeValue('brand.100', 'whiteAlpha.200');

  // Filtramos cuántos mostramos
  const visibleTestimonials = showMore ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

  return (
    <Box bg={bgSection} py={{ base: 12, md: 20 }} id="testimonios">
      <Container maxW="container.xl">
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={12}>
          <Heading fontSize={'3xl'} color="brand.600" fontFamily="heading">
            Lo que dicen nuestros huéspedes
          </Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Historias reales de experiencias inolvidables en Altura Andina.
          </Text>
        </Stack>

        {/* GRID RESPONSIVO */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          <AnimatePresence initial={false}>
            {visibleTestimonials.map((testimonial, index) => (
              <MotionBox
                key={index} // Usar ID único si lo tuvieras, index sirve por ahora
                layout // Propiedad mágica: anima el cambio de posición si el grid cambia
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Stack
                  bg={bgCard}
                  boxShadow={'lg'}
                  p={8}
                  rounded={'xl'}
                  align={'center'}
                  pos={'relative'}
                  h="100%" // Para que todas las tarjetas tengan la misma altura
                  justify="space-between"
                  _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                  transition="all 0.3s"
                >
                  {/* Icono de comillas decorativo */}
                  <Icon 
                    as={FaQuoteLeft} 
                    w={10} 
                    h={10} 
                    color={quoteColor} 
                    position="absolute" 
                    top={4} 
                    left={4} 
                  />

                  <Text
                    textAlign={'center'}
                    color={'gray.600'}
                    fontSize={'lg'}
                    fontStyle="italic"
                    mt={6}
                    mb={6}
                    position="relative"
                    zIndex={1}
                  >
                    "{testimonial.quote}"
                  </Text>

                  <Flex align={'center'} mt={4} direction="column">
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.author}
                      mb={2}
                      size="lg"
                      border="2px solid"
                      borderColor="brand.500"
                    />
                    <Stack spacing={-1} align={'center'}>
                      <Text fontWeight={600} color="brand.600">{testimonial.author}</Text>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        {testimonial.role}
                      </Text>
                    </Stack>
                  </Flex>
                </Stack>
              </MotionBox>
            ))}
          </AnimatePresence>
        </SimpleGrid>

        {/* BOTÓN VER MÁS / MENOS */}
        <Flex justify="center" mt={12}>
          <Button
            onClick={() => setShowMore(!showMore)}
            bg={'brand.500'}
            color={'white'}
            rounded={'full'}
            px={8}
            size="lg"
            rightIcon={showMore ? <FaChevronUp /> : <FaChevronDown />}
            _hover={{
              bg: 'brand.600',
              transform: 'scale(1.05)',
              boxShadow: 'lg',
            }}
          >
            {showMore ? "Ver menos" : "Leer más historias"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default Testimonials;