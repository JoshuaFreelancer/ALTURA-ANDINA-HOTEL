import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useSpring, animated } from "react-spring";
import {
  MdRestaurant,
  MdHotTub,
  MdWifi,
  MdDirectionsWalk,
  MdLocalActivity,
  MdBusiness,
} from "react-icons/md";

function ServicesSection() {
  const flipProps = useSpring({
    from: { transform: "perspective(600px) rotateX(180deg)", opacity: 0 },
    to: { transform: "perspective(600px) rotateX(0deg)", opacity: 1 },
    config: { mass: 15, tension: 500, friction: 100 },
  });

  return (
    <section id="services">
      <Typography variant="h2" align="center" gutterBottom>
        Nuestros Servicios
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <animated.div style={flipProps}>
              <Card>
                <CardMedia
                  component="img"
                  style={{ height: '150px', objectFit: 'cover' }}
                  image={service.image || "/images/placeholder.jpg"}
                  alt={`Servicio ${index + 1}`}
                />

                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {service.description}
                  </Typography>
                  {service.icon}
                </CardContent>
              </Card>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

const services = [
  {
    title: "Restaurante Gourmet",
    description: "Disfruta de exquisitos platos preparados por chefs expertos.",
    icon: <MdRestaurant />,
    image: "assets/images/Restaurante.jpeg",
  },
  {
    title: "Spa de Lujo",
    description: "Relájate y rejuvenece tu cuerpo en nuestro lujoso spa.",
    icon: <MdHotTub />,
    image: "assets/images/Spa.jpeg",
  },
  {
    title: "Wi-Fi de Alta Velocidad",
    description:
      "Mantente conectado con nuestro rápido y confiable servicio de Wi-Fi 5G.",
    icon: <MdWifi />,
    image: "assets/images/Wifi.jpeg",
  },
  {
    title: "Excursiones de Montañismo",
    description:
      "Explora las majestuosas montañas de Mérida y sube el pico del avila con guías de expertos.",
    icon: <MdDirectionsWalk />,
    image: "assets/images/Montaña.jpeg",
  },
  {
    title: "Actividades Recreativas",
    description:
      "Disfruta de una amplia gama de actividades recreativas en nuestro maravilloso hotel.",
    icon: <MdLocalActivity />,
    image: "assets/images/Recreacion.jpg",
  },
  {
    title: "Salas de Reuniones",
    description:
      "Organiza reuniones y eventos en nuestras modernas y equipadas salas.",
    icon: <MdBusiness />,
    image: "assets/images/Reuniones.jpg",
  },
];

export default ServicesSection;
