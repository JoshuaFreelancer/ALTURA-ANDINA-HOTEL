import React from "react";
import {
  Center,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const Loader = ({ text = "Cargando..." }) => {
  const color = useColorModeValue("brand.500", "brand.200");

  return (
    <Center w="100%" h="50vh" minH="300px">
      <VStack spacing={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={color}
          size="xl"
          w="80px" // Hacemos el spinner un poco más grande
          h="80px"
        />
        <Text
          color={color}
          fontSize="lg"
          fontWeight="medium"
          fontFamily="heading"
          letterSpacing="wide"
          animate={{ opacity: [0.5, 1, 0.5] }} // Efecto de parpadeo suave (opcional con framer-motion si quisieras, pero simple con CSS basta)
        >
          {text}
        </Text>
      </VStack>
    </Center>
  );
};

export default Loader;
