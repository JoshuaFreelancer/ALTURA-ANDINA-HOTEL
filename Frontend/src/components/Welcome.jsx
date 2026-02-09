import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Snowfall from "react-snowfall";
import { useSpring, animated } from "react-spring";

// Material UI Components
import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Welcome() {
  const [showTitle, setShowTitle] = useState(false);

  // CORRECCIÓN IMPORTANTE:
  // Los cambios de estado basados en tiempo deben ir dentro de useEffect.
  // Esto evita bucles infinitos y errores de renderizado.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 500);

    // Limpiamos el timer si el componente se desmonta antes de los 500ms
    return () => clearTimeout(timer);
  }, []);

  // Configuración de la animación del título con React Spring
  const titleProps = useSpring({
    opacity: showTitle ? 1 : 0,
    transform: showTitle ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 200, friction: 20 },
  });

  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer"); // Buena práctica de seguridad
  };

  return (
    <div className="relative w-full">
      {/* Efecto de nieve (z-index ajustado para no bloquear botones) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
         <Snowfall snowflakeCount={40} color="white" />
      </div>

      {/* Contenedor principal con imagen de fondo */}
      <div
        className="bg-cover bg-center w-full h-96 md:h-[500px] relative text-center flex items-center justify-center"
        style={{ backgroundImage: `url(/assets/images/Welcome.jpg)` }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-20 flex flex-col items-center justify-center font-playfair-display text-white px-4">
          {/* Título animado */}
          <animated.h4
            style={titleProps}
            className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl font-bold mb-8 whitespace-pre-wrap drop-shadow-lg"
          >
            ¡Bienvenido a tu hogar lejos de casa!
          </animated.h4>

          {/* Botón de Reserva */}
          <NavLink to="/contacto" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#e53e3e", // Color personalizado (ejemplo rojo)
                "&:hover": { backgroundColor: "#c53030" },
                fontFamily: "Lato, sans-serif",
                padding: "10px 30px"
              }}
            >
              Reserva ahora
            </Button>
          </NavLink>
        </div>

        {/* Iconos de redes sociales */}
        <div className="absolute bottom-4 right-4 flex gap-4 z-30">
          <SocialIcon Icon={FacebookIcon} onClick={() => handleRedirect("https://www.facebook.com")} />
          <SocialIcon Icon={TwitterIcon} onClick={() => handleRedirect("https://twitter.com")} />
          <SocialIcon Icon={InstagramIcon} onClick={() => handleRedirect("https://www.instagram.com")} />
          <SocialIcon Icon={LinkedInIcon} onClick={() => handleRedirect("https://www.linkedin.com")} />
        </div>
      </div>
    </div>
  );
}

// Pequeño componente auxiliar para limpiar el código repetitivo de iconos
const SocialIcon = ({ Icon, onClick }) => (
  <Icon
    className="text-white cursor-pointer transition duration-300 transform hover:scale-110 hover:text-gray-300"
    style={{ fontSize: 28 }} // Aumenté un poco el tamaño para mejor UX
    onClick={onClick}
  />
);

export default Welcome;