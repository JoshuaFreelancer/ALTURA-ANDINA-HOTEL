import React from 'react';
import { Typography, Grid, Box, Card } from '@mui/material'; // Todo de MUI para consistencia
import { useSpring, animated } from 'react-spring';

const HotelSection = () => {
  const textProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { tension: 80, friction: 14 },
  });

  return (
    <section id="hotel-section" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Grid Container V1 */}
        <Grid container spacing={6} alignItems="center">
          
          <Grid item xs={12} md={6}>
            <animated.div style={textProps}>
              <Box>
                <Typography variant="h2" gutterBottom sx={{ color: '#2c5282', fontWeight: 'bold' }}>
                  Bienvenido a Altura Andina
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ color: '#4a5568' }}>
                  Descubre una experiencia única en el corazón de Mérida
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Lato', fontSize: '1.1rem', color: '#2d3748' }}>
                  El Altura Andina Hotel & Spa es un lugar de ensueño ubicado en el corazón de la hermosa ciudad de Mérida.
                  Con vistas espectaculares y servicio excepcional.
                </Typography>
              </Box>
            </animated.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <img 
                src="assets/images/Hotel.png" 
                alt="Hotel Altura Andina" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Card>
          </Grid>

        </Grid>
      </div>
    </section>
  );
}

export default HotelSection;