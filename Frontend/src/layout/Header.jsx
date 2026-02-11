import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  Icon,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  FaMountain,
  FaHome,
  FaBed,
  FaConciergeBell,
  FaPhone,
  FaCalendarCheck,
} from "react-icons/fa";
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Widget del Clima Corregido
import WeatherWidget from "../components/common/WeatherWidget";

const MotionFlex = motion(Flex);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  // Colores dinámicos
  const bgHeader = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={bgHeader}
      shadow="sm"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Container maxW="container.xl" px={4}>
        <Flex minH={"70px"} align={"center"} justify={"space-between"}>
          {/* 1. Toggle Móvil */}
          <Flex display={{ base: "flex", lg: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          {/* 2. Logo */}
          <Flex flex={{ base: 1 }} justify={{ base: "center", lg: "start" }}>
            <RouterLink to="/">
              <MotionFlex
                align="center"
                cursor="pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon as={FaMountain} w={8} h={8} color="brand.500" mr={2} />
                <Text
                  textAlign={{ base: "center", md: "left" }}
                  fontFamily={"heading"}
                  fontWeight="bold"
                  fontSize="xl"
                  color={"brand.600"}
                  letterSpacing="tight"
                >
                  Altura Andina
                </Text>
              </MotionFlex>
            </RouterLink>

            {/* Navegación Desktop CON ICONOS */}
            <Flex display={{ base: "none", lg: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          {/* 3. Lado Derecho: Clima y Acción */}
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={4}
            align="center"
          >
            {/* Widget del Clima */}
            <Box display={{ base: "none", md: "block" }}>
              <WeatherWidget />
            </Box>

            {/* Botón de Reserva Destacado */}
            <Button
              as={RouterLink}
              to="/contacto"
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"brand.500"}
              leftIcon={<FaCalendarCheck />}
              _hover={{
                bg: "brand.600",
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              size="sm"
              rounded="full"
              px={6}
            >
              Reservar
            </Button>
          </Stack>
        </Flex>

        {/* Menú Desplegable Móvil */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  );
}

// --- DATOS DE NAVEGACIÓN ---
const NAV_ITEMS = [
  { label: "Inicio", icon: FaHome, href: "/" },
  { label: "Habitaciones", icon: FaBed, href: "/habitaciones" },
  { label: "Servicios", icon: FaConciergeBell, href: "/servicios" },
  { label: "Contacto", icon: FaPhone, href: "/contacto" },
];

// --- COMPONENTE MENU DESKTOP (Restaurado con Iconos) ---
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("brand.500", "brand.300");
  const activeBg = useColorModeValue("brand.50", "whiteAlpha.200");

  return (
    <Stack direction={"row"} spacing={2} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Button
          key={navItem.label}
          as={NavLink}
          to={navItem.href}
          leftIcon={<Icon as={navItem.icon} />} // ¡Aquí vuelven los iconos!
          variant="ghost"
          fontSize={"sm"}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
            bg: activeBg,
          }}
          _activeLink={{
            color: linkHoverColor,
            fontWeight: "bold",
            bg: activeBg,
            borderColor: "brand.500",
          }}
          px={4}
          rounded="md"
        >
          {navItem.label}
        </Button>
      ))}
    </Stack>
  );
};

// --- COMPONENTE MENU MOVIL ---
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ lg: "none" }}
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      spacing={4}
    >
      {/* Widget del Clima en Móvil */}
      <Flex justify="center" py={2}>
        <WeatherWidget />
      </Flex>

      {NAV_ITEMS.map((navItem) => (
        <Flex
          key={navItem.label}
          py={2}
          as={NavLink}
          to={navItem.href}
          justify={"space-between"}
          align={"center"}
          _hover={{ textDecoration: "none" }}
          style={({ isActive }) => ({
            color: isActive ? "var(--chakra-colors-brand-500)" : "inherit",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          <Flex align="center">
            <Icon as={navItem.icon} color="brand.500" mr={3} w={5} h={5} />
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              {navItem.label}
            </Text>
          </Flex>
        </Flex>
      ))}

      <Button
        as={RouterLink}
        to="/contacto"
        w="full"
        colorScheme="brand"
        bg="brand.500"
        leftIcon={<FaCalendarCheck />}
      >
        Reservar Ahora
      </Button>
    </Stack>
  );
};

export default Header;
