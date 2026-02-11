import {
  Box,
  Flex,
  Text,
  Icon,
  Skeleton,
  Tooltip,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

import { useWeather } from "../../services/useWeather";

const WeatherWidget = () => {
  const { weatherData, loading, error } = useWeather();

  // --- PALETA DE COLORES DE LA MARCA (Altura Andina) ---
  const bgBadge = useColorModeValue("brand.50", "whiteAlpha.100");
  const borderColor = useColorModeValue("brand.100", "whiteAlpha.200");
  const tempColor = useColorModeValue("brand.800", "white"); // Texto oscuro fuerte
  const cityColor = useColorModeValue("brand.500", "brand.200"); // Color primario para la ciudad
  const iconColor = useColorModeValue("orange.400", "yellow.300"); // Mantenemos calidez para el sol

  // Si hay error, no renderizamos nada (limpieza)
  if (error) return null;

  if (loading) {
    return <Skeleton height="32px" width="110px" borderRadius="full" />;
  }

  // Protección
  if (!weatherData) return null;

  return (
    <Tooltip
      label={`Humedad: ${weatherData.humidity}% • ${weatherData.description}`}
      hasArrow
      bg="brand.600"
      color="white"
      fontSize="xs"
      placement="bottom"
    >
      <Flex
        align="center"
        bg={bgBadge}
        borderRadius="full"
        px={3}
        py={1.5} // Un poco más alto para respirar
        border="1px solid"
        borderColor={borderColor}
        cursor="default"
        transition="all 0.2s ease-in-out"
        _hover={{
          borderColor: "brand.300",
          transform: "translateY(-1px)",
          boxShadow: "sm",
        }}
      >
        {/* Icono del Clima */}
        <Icon as={weatherData.icon} w={5} h={5} color={iconColor} mr={2} />

        {/* Datos de Texto */}
        <Box lineHeight="1" textAlign="right">
          <HStack spacing={1} justify="flex-end">
            <Text fontWeight="800" fontSize="sm" color={tempColor}>
              {weatherData.temp}°
            </Text>
          </HStack>
          
          <Text
            fontSize="0.65rem" // Texto pequeño estilo "etiqueta"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            color={cityColor}
            mt={0.5}
          >
            Mérida
          </Text>
        </Box>
      </Flex>
    </Tooltip>
  );
};

export default WeatherWidget;