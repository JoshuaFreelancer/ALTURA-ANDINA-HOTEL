import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa"; // Usamos react-icons como acordamos

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 140) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      icon={<FaArrowUp />} // Icono de flecha
      onClick={scrollToTop}
      isRound={true} // Esto hace el borderRadius: '50%' automáticamente
      aria-label="Volver arriba" // Importante para accesibilidad
      // --- ESTILOS VISUALES (Usando tu tema) ---
      bg="brand.100" // Es el #DCE9F5 que tenías
      color="brand.600" // Color del icono (oscuro para contraste)
      size="lg" // Un tamaño cómodo
      shadow="md" // Una sombra suave para que flote bonito
      // --- POSICIONAMIENTO ---
      position="fixed"
      bottom={{ base: "1rem", md: "2rem" }} // 1rem en móvil, 2rem en PC
      right={{ base: "1rem", md: "2rem" }}
      zIndex={1000}
      // --- ANIMACIÓN Y ESTADOS ---
      opacity={isVisible ? 1 : 0}
      transition="all 0.5s ease"
      pointerEvents={isVisible ? "auto" : "none"} // Evita clicks fantasma cuando es invisible
      // --- HOVER ---
      _hover={{
        bg: "brand.300", // Un poco más oscuro al pasar el mouse
        transform: "translateY(-2px)", // Efecto de elevación sutil
        shadow: "lg",
      }}
    />
  );
}

export default ScrollToTopButton;
