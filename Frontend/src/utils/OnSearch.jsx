import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  FormControl,
} from "@chakra-ui/react";
import { FaSearch, FaUndo, FaUserFriends } from "react-icons/fa";
import { useHabitaciones } from "../hooks/useHabitacionesContext";

const OnSearch = () => {
  const { habitaciones, setFilteredHabitaciones } = useHabitaciones();
  const [capacity, setCapacity] = useState("");

  // --- EFECTO DE FILTRADO ---
  // Se ejecuta automáticamente cada vez que cambia 'capacity' o la lista de habitaciones.
  // Esto elimina la necesidad de funciones debounce complejas para este caso simple.
  useEffect(() => {
    // Si no hay datos, no hacemos nada
    if (!habitaciones) return;

    let result = habitaciones;

    if (capacity !== "") {
      const numPeople = parseInt(capacity);
      if (!isNaN(numPeople)) {
        // CORRECCIÓN LÓGICA:
        // Buscamos habitaciones donde quepa la gente (Capacidad >= Búsqueda)
        result = result.filter((h) => h.capacity >= numPeople);
      }
    }

    setFilteredHabitaciones(result);
  }, [capacity, habitaciones, setFilteredHabitaciones]);

  // --- RESET ---
  const handleResetFilters = () => {
    setCapacity("");
    // No necesitamos llamar a filter() aquí manualmente,
    // el useEffect detectará el cambio a '' y reseteará la lista automáticamente.
  };

  return (
    <Box w="100%" py={6} px={4}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        align="center"
        justify="center"
        maxW="800px"
        mx="auto"
      >
        {/* Input de Búsqueda */}
        <FormControl maxW={{ base: "100%", md: "400px" }}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUserFriends} color="gray.400" />
            </InputLeftElement>
            <Input
              type="number"
              placeholder="¿Cuántas personas son?"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              bg="white"
              borderColor="gray.300"
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
              }}
              _hover={{
                borderColor: "brand.400",
              }}
            />
          </InputGroup>
        </FormControl>

        {/* Botón de Reset (Solo aparece si hay filtro) */}
        {capacity && (
          <Button
            leftIcon={<FaUndo />}
            colorScheme="gray"
            variant="ghost"
            onClick={handleResetFilters}
            size="lg"
            _hover={{ bg: "brand.100", color: "brand.600" }}
          >
            Ver todas
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default OnSearch;
