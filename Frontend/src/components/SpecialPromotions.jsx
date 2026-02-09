import React from 'react';
import { 
  Box, 
  Heading, 
  List, 
  ListItem, 
  ListIcon, 
  Text, 
  useColorModeValue,
  Flex 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  MdLocalOffer, 
  MdFreeBreakfast, 
  MdAirplanemodeActive, 
  MdHotel, 
  MdFlightTakeoff 
} from 'react-icons/md';

// Creamos componentes animados
const MotionBox = motion(Box);
const MotionListItem = motion(ListItem);

const SpecialPromotions = () => {
  // Colores dinámicos
  const bgCard = useColorModeValue('white', 'gray.700');
  const accentColor = 'brand.500';

  // Datos de las promociones (Mejor que hardcodear en el JSX)
  const promotions = [
    {
      text: "¡Obtén un 20% de descuento en reservas anticipadas!",
      icon: MdLocalOffer,
      color: "red.500" // Destacamos el descuento en rojo
    },
    {
      text: "Desayuno buffet gratis todos los días de tu estadía.",
      icon: MdFreeBreakfast,
      color: accentColor
    },
    {
      text: "Tour guiado gratuito por el casco histórico de la ciudad.",
      icon: MdAirplanemodeActive,
      color: accentColor
    },
    {
      text: "Estacionamiento privado gratuito y vigilado 24/7.",
      icon: MdHotel,
      color: accentColor
    },
    {
      text: "Servicio de transporte gratuito a lugares de interés cercanos.",
      icon: MdFlightTakeoff,
      color: accentColor
    }
  ];

  // Configuración de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Box py={8}>
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        bg={bgCard}
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        borderLeft="4px solid"
        borderColor="brand.500" // Borde lateral elegante
      >
        <Flex align="center" mb={6}>
          <Box as={MdLocalOffer} color="brand.500" w={8} h={8} mr={3} />
          <Heading size="lg" fontFamily="heading" color="brand.600">
            Promociones Especiales
          </Heading>
        </Flex>

        <List spacing={4}>
          {promotions.map((promo, index) => (
            <MotionListItem 
              key={index} 
              variants={itemVariants}
              display="flex" 
              alignItems="center"
              fontSize="lg"
              color="gray.600"
            >
              <ListIcon 
                as={promo.icon} 
                color={promo.color} 
                w={6} 
                h={6} 
                mr={4} // Espacio entre icono y texto
              />
              <Text as="span">{promo.text}</Text>
            </MotionListItem>
          ))}
        </List>
      </MotionBox>
    </Box>
  );
};

export default SpecialPromotions;