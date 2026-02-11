import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaUndo, FaUserFriends, FaBed } from "react-icons/fa";

// --- CORRECCIÓN IMPORTANTE ---
// Importamos el hook correcto desde la carpeta correcta
import { useRooms } from "../hooks/useRooms";

const OnSearch = () => {
  // Consumimos el hook useRooms
  const { habitaciones, setFilteredHabitaciones } = useRooms();

  // Estado local para los filtros
  const [filters, setFilters] = useState({
    capacity: "",
    type: "",
  });

  // Extraemos los tipos únicos de habitación para el Select
  // (Ej: ["Estándar", "Lujo", "Ejecutiva"])
  const roomTypes = [...new Set(habitaciones.map((h) => h.roomType))];

  // --- EFECTO DE FILTRADO ---
  // Se ejecuta automáticamente cuando cambia algún filtro o la lista base
  useEffect(() => {
    if (!habitaciones) return;

    let result = habitaciones;

    // 1. Filtro por Capacidad
    if (filters.capacity !== "") {
      const numPeople = parseInt(filters.capacity);
      if (!isNaN(numPeople)) {
        // Buscamos habitaciones donde quepan al menos N personas
        result = result.filter((h) => h.capacity >= numPeople);
      }
    }

    // 2. Filtro por Tipo
    if (filters.type !== "") {
      result = result.filter((h) => h.roomType === filters.type);
    }

    // Actualizamos la lista que se ve en pantalla
    setFilteredHabitaciones(result);
  }, [filters, habitaciones, setFilteredHabitaciones]);

  // Manejadores de cambios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ capacity: "", type: "" });
  };

  // Estilos
  const bgBar = useColorModeValue("white", "gray.800");

  return (
    <Box
      w="100%"
      bg={bgBar}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={6}
        align="flex-end" // Alineamos abajo para que los inputs coincidan con el botón
        justify="center"
      >
        {/* FILTRO 1: CAPACIDAD */}
        <FormControl maxW={{ base: "100%", md: "300px" }}>
          <FormLabel fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>
            Huéspedes
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="brand.400">
              <Icon as={FaUserFriends} />
            </InputLeftElement>
            <Input
              type="number"
              name="capacity"
              placeholder="¿Cuántas personas?"
              value={filters.capacity}
              onChange={handleInputChange}
              min={1}
              focusBorderColor="brand.500"
              borderRadius="md"
            />
          </InputGroup>
        </FormControl>

        {/* FILTRO 2: TIPO DE HABITACIÓN */}
        <FormControl maxW={{ base: "100%", md: "300px" }}>
          <FormLabel fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>
            Categoría
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="brand.400">
              <Icon as={FaBed} />
            </InputLeftElement>
            <Select
              name="type"
              placeholder="Todas las categorías"
              value={filters.type}
              onChange={handleInputChange}
              pl={10} // Espacio para el icono a la izquierda
              focusBorderColor="brand.500"
              borderRadius="md"
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </InputGroup>
        </FormControl>

        {/* BOTÓN DE RESET */}
        {(filters.capacity || filters.type) && (
          <Button
            leftIcon={<FaUndo />}
            colorScheme="gray"
            variant="ghost"
            onClick={handleResetFilters}
            mb="2px" // Ajuste fino de alineación
            _hover={{ bg: "red.50", color: "red.500" }}
          >
            Limpiar filtros
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default OnSearch;
