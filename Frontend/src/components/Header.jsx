import React, { useEffect, useState } from "react";
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
  Badge,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  FaMountain,
  FaHome,
  FaBed,
  FaConciergeBell,
  FaPhone,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { getWeatherByCity } from "../services/api";

const MotionFlex = motion(Flex);

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCity("Mérida", "es");
        setWeather(data);
      } catch (error) {
        console.error("Error clima:", error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <Box position="sticky" top="0" zIndex="1000" bg="white" shadow="sm">
      <Container maxW="container.xl" px={4}>
        <Flex minH={"70px"} align={"center"} justify={"space-between"}>
          {/* Toggle Móvil */}
          <Flex display={{ base: "flex", md: "none" }}>
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

          {/* Logo */}
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <RouterLink to="/">
              <MotionFlex
                align="center"
                cursor="pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaMountain} w={8} h={8} color="brand.500" mr={2} />
                <Text
                  textAlign={{ base: "center", md: "left" }}
                  fontFamily={"heading"}
                  fontWeight="bold"
                  fontSize="xl"
                  color={"brand.600"}
                >
                  Altura Andina
                </Text>
              </MotionFlex>
            </RouterLink>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          {/* Clima */}
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {weather && (
              <Badge
                colorScheme="blue"
                borderRadius="full"
                px={3}
                py={1}
                display="flex"
                alignItems="center"
              >
                <Text fontSize="sm" fontWeight="bold">
                  {Math.round(weather.main.temp)}°C
                </Text>
                <Text
                  fontSize="xs"
                  ml={2}
                  display={{ base: "none", md: "block" }}
                >
                  {weather.weather[0].description}
                </Text>
              </Badge>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  );
}

// DATOS DE NAVEGACIÓN
const NAV_ITEMS = [
  { label: "Inicio", icon: FaHome, href: "/" },
  { label: "Habitaciones", icon: FaBed, href: "/habitaciones" },
  { label: "Servicios", icon: FaConciergeBell, href: "/servicios" },
  { label: "Contacto", icon: FaPhone, href: "/contacto" },
];

// MENU DESKTOP
const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Button
          key={navItem.label}
          as={RouterLink}
          to={navItem.href}
          variant="ghost"
          fontSize={"sm"}
          fontWeight={500}
          leftIcon={<Icon as={navItem.icon} />}
          color={"gray.600"}
          _hover={{
            textDecoration: "none",
            color: "brand.500",
            bg: "brand.50",
          }}
        >
          {navItem.label}
        </Button>
      ))}
    </Stack>
  );
};

// MENU MOVIL
const MobileNav = () => {
  return (
    <Stack
      bg={"white"}
      p={4}
      display={{ md: "none" }}
      borderTop="1px solid"
      borderColor="gray.100"
    >
      {NAV_ITEMS.map((navItem) => (
        <Flex
          key={navItem.label}
          py={2}
          as={RouterLink}
          to={navItem.href}
          justify={"space-between"}
          align={"center"}
          _hover={{ textDecoration: "none" }}
        >
          <Flex align="center">
            <Icon as={navItem.icon} color="brand.500" mr={3} />
            <Text fontWeight={600} color="gray.600">
              {navItem.label}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};

export default Header;
