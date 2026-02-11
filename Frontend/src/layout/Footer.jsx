import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Input, 
  IconButton, 
  Link, 
  Flex,
  Divider,
  Icon,
  Heading,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaMountain, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const SocialButton = ({ icon, href }) => (
  <IconButton
    as="a"
    href={href}
    target="_blank"
    aria-label="Social Media"
    icon={<Icon as={icon} w={5} h={5} />}
    rounded="full"
    bg="whiteAlpha.100"
    color="white"
    _hover={{
      bg: 'brand.500',
      color: 'white',
      transform: 'translateY(-2px)'
    }}
    transition="all 0.3s"
  />
);

const FooterLink = ({ to, children }) => (
  <Link
    as={RouterLink}
    to={to}
    color="gray.400"
    _hover={{ color: 'brand.300', textDecoration: 'none' }}
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={12}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          
          {/* COLUMNA 1: MARCA */}
          <Stack spacing={6}>
            <Flex align="center">
              <Icon as={FaMountain} w={8} h={8} color="brand.500" mr={2} />
              <Heading size="md" fontFamily="heading">Altura Andina</Heading>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              Tu refugio de lujo en el corazón de los Andes venezolanos. 
              Experiencias inolvidables, confort y naturaleza.
            </Text>
            <Stack direction="row" spacing={4}>
              <SocialButton icon={FaFacebook} href="https://facebook.com" />
              <SocialButton icon={FaXTwitter} href="https://x.com/?lang=es" />
              <SocialButton icon={FaInstagram} href="https://instagram.com" />
            </Stack>
          </Stack>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <Stack align="flex-start">
            <Heading size="sm" mb={2}>Navegación</Heading>
            <FooterLink to="/">Inicio</FooterLink>
            <FooterLink to="/habitaciones">Habitaciones</FooterLink>
            <FooterLink to="/servicios">Servicios</FooterLink>
            <FooterLink to="/contacto">Contacto</FooterLink>
          </Stack>

          {/* COLUMNA 3: DIRECCIÓN */}
          <Stack align="flex-start">
            <Heading size="sm" mb={2}>Encuéntranos</Heading>
            <Text color="gray.400">Av. Principal, Mérida</Text>
            <Text color="gray.400">Callejón de los Suspiros</Text>
            <Text color="gray.400">Paseo de la Montaña</Text>
            <Text color="gray.400" mt={2} fontWeight="bold">reservas@alturaandina.com</Text>
          </Stack>

          {/* COLUMNA 4: NEWSLETTER */}
          <Stack spacing={4}>
            <Heading size="sm" mb={2}>Newsletter</Heading>
            <Text color="gray.400" fontSize="sm">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </Text>
            <InputGroup>
              <Input 
                placeholder="Tu correo electrónico" 
                bg="whiteAlpha.100" 
                border={0} 
                _focus={{ bg: 'whiteAlpha.300' }}
                color="white"
              />
              <InputRightElement width="3rem">
                <IconButton 
                  h="1.75rem" 
                  size="sm" 
                  colorScheme="brand" 
                  bg="brand.500" 
                  icon={<FaPaperPlane />} 
                  aria-label="Subscribe"
                />
              </InputRightElement>
            </InputGroup>
          </Stack>

        </SimpleGrid>

        <Divider my={8} borderColor="gray.700" />

        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Text fontSize="sm" color="gray.500">
            &copy; {new Date().getFullYear()} Altura Andina Hotel & Spa. Todos los derechos reservados.
          </Text>
          <Stack direction="row" spacing={4} mt={{ base: 4, md: 0 }}>
             <Link href="#" fontSize="sm" color="gray.500">Privacidad</Link>
             <Link href="#" fontSize="sm" color="gray.500">Términos</Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;