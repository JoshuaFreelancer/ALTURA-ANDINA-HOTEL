import React from 'react';
import { Typography, Card, CardContent, CardHeader, Grid } from "@mui/material";
// Usamos Link de Router para navegación interna y 'a' o MUI Link para externa
import { Link } from "react-router-dom"; 
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EventIcon from "@mui/icons-material/Event";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useSpring, animated } from "react-spring";

function BlogSection() {
  const animatedProps = useSpring({
    to: { opacity: 1, transform: "translateY(0)" },
    from: { opacity: 0, transform: "translateY(-50px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section id="blog-section" className="py-12">
      <div className="container mx-auto px-4">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          ¡Explora Mérida!
        </Typography>
        
        {/* Grid Container V1 */}
        <Grid container spacing={4}>
          
          {/* Item 1 */}
          <Grid item xs={12} md={4}>
            <animated.div style={animatedProps}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Artículos de Turismo" />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Descubre los mejores lugares para visitar en Mérida.
                  </Typography>
                  <a
                    href="https://www.tripadvisor.com.ve/Attractions-g316050-Activities-Merida_Andean_Region.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', color: '#1976d2', textDecoration: 'none' }}
                  >
                    Ver más <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </a>
                </CardContent>
              </Card>
            </animated.div>
          </Grid>

          {/* Item 2 */}
          <Grid item xs={12} md={4}>
            <animated.div style={animatedProps}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Consejos de Viaje" />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Consejos útiles para tu viaje.
                  </Typography>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <FlightTakeoffIcon fontSize="small" /> Empaca ropa ligera.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <LocalMallIcon fontSize="small" /> Cultura local.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <RestaurantIcon fontSize="small" /> Comida típica.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <EventIcon fontSize="small" /> Reserva actividades.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </animated.div>
          </Grid>

          {/* Item 3 */}
          <Grid item xs={12} md={4}>
            <animated.div style={animatedProps}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="Guías Turísticas" />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Explora nuestras guías completas.
                  </Typography>
                  <a
                    href="https://www.venezuelatuya.com/andes/guia_turistica_de_merida.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', color: '#1976d2', textDecoration: 'none' }}
                  >
                    Ver más <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </a>
                </CardContent>
              </Card>
            </animated.div>
          </Grid>

        </Grid>
      </div>
    </section>
  );
}

export default BlogSection;