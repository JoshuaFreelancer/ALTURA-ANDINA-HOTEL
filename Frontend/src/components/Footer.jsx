import React from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import Grid from '@mui/material/Grid';
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import MountainIcon from "@mui/icons-material/Terrain";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  // Función para manejar redirección a las redes sociales
  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <Grid container spacing={4}>
          {/* Columna del formulario */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Logo */}
              <Grid item xs={12}>
                {/* Logo */}
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="mb-4 md:mb-0"
                  >
                    <h2 className="text-2xl text-brand-500 font-playfair-display flex items-center cursor-pointer">
                      <MountainIcon className="w-10 h-10 mr-2" />
                      Altura Andina
                    </h2>
                  </motion.div>
                </div>
              </Grid>
              {/* Título y campo de correo */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" marginBottom="10px">
                  Mantente activo con nuestras últimas actualizaciones
                </Typography>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Correo electrónico"
                      size="small"
                      InputLabelProps={{ style: { color: "white" } }}
                      InputProps={{ style: { color: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="primary" fullWidth>
                      Suscribirse
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Columna de enlaces */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Enlaces */}
              <Grid item xs={6}>
                <Typography variant="h6">Navegación</Typography>
                <Typography variant="body2">
                  <NavLink to="/">Inicio</NavLink>
                </Typography>
                <Typography variant="body2">
                  <NavLink to="/habitaciones">Habitaciones</NavLink>
                </Typography>
                <Typography variant="body2">
                  <NavLink to="/servicios">Servicios</NavLink>
                </Typography>
                <Typography variant="body2">
                  <NavLink to="/contacto">Contacto</NavLink>
                </Typography>
              </Grid>
              {/* Direcciones */}
              <Grid item xs={6}>
                <Typography variant="h6">Direcciones</Typography>
                <Typography variant="body2">Av. Principal, Mérida</Typography>
                <Typography variant="body2">
                  Callejón de los Suspiros, Mérida
                </Typography>
                <Typography variant="body2">
                  Paseo de la Montaña, Mérida
                </Typography>
                <Typography variant="body2">
                  Calle de los Pájaros, Mérida
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Barra separadora con margen top y bottom */}
        <Divider
          variant="middle"
          className="my-8"
          style={{
            backgroundColor: "white",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        />
        {/* Texto de copyright y redes sociales con efecto de animación */}
        <div className="flex justify-between items-center">
          <Typography variant="body2">
            &copy; 2024 Altura Andina Hotel & Spa. Todos los derechos
            reservados.
          </Typography>
          <div className="flex space-x-4">
            {/* Iconos de redes sociales con efecto de animación */}
            <FacebookIcon
              className="text-white cursor-pointer transition duration-300 transform hover:scale-110"
              style={{ fontSize: 24 }}
              onClick={() => handleRedirect("https://www.facebook.com")}
            />
            <TwitterIcon
              className="text-white cursor-pointer transition duration-300 transform hover:scale-110"
              style={{ fontSize: 24 }}
              onClick={() => handleRedirect("https://twitter.com")}
            />
            <InstagramIcon
              className="text-white cursor-pointer transition duration-300 transform hover:scale-110"
              style={{ fontSize: 24 }}
              onClick={() => handleRedirect("https://www.instagram.com")}
            />
            <LinkedInIcon
              className="text-white cursor-pointer transition duration-300 transform hover:scale-110"
              style={{ fontSize: 24 }}
              onClick={() => handleRedirect("https://www.linkedin.com")}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
