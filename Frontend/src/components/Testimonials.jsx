import { useState } from 'react';
// ELIMINÉ EL IMPORT DE GRID PARA EVITAR CONFLICTOS, YA USAS CSS GRID
import { Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import { useSpring, animated } from 'react-spring';

function Testimonials() {
  const [showMore, setShowMore] = useState(false);

  const flipProps = useSpring({
    from: { opacity: 0, transform: 'perspective(600px) rotateY(-90deg)' }, // Ajustado para suavidad
    to: { opacity: 1, transform: 'perspective(600px) rotateY(0deg)' },
    config: { mass: 1, tension: 180, friction: 20 },
  });

  const testimonials = [
    {
      quote: "¡Una experiencia increíble! El personal muy amable. Definitivamente volveré.",
      author: "Juan Pérez",
      image: "/assets/images/client1.jpg"
    },
    {
      quote: "Pasamos unas vacaciones maravillosas. La ubicación es perfecta.",
      author: "María González",
      image: "/assets/images/client2.jpg"
    },
    {
      quote: "El servicio es excepcional. Todos muy atentos a nuestras necesidades.",
      author: "Carlos Rodríguez",
      image: "/assets/images/client3.jpg"
    },
    {
      quote: "Excelente hotel con instalaciones de primera clase.",
      author: "Ana Martínez",
      image: "/assets/images/client4.jpg"
    },
    {
      quote: "Una estancia muy agradable. Habitaciones cómodas.",
      author: "Luis Hernández",
      image: "/assets/images/client5.jpg"
    },
  ];

  const visibleTestimonials = showMore ? testimonials : testimonials.slice(0, 3);

  return (
    <div className="bg-gray-200 py-12">
      <div className="container mx-auto px-4">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
          Testimonios de nuestros clientes
        </Typography>
        
        {/* USANDO CSS GRID NORMAL (Mejor rendimiento y cero conflictos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <animated.div key={index} style={flipProps}>
              <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <Typography variant="body1" gutterBottom sx={{ fontStyle: 'italic' }}>
                    "{testimonial.quote}"
                  </Typography>
                  <div className="flex items-center mt-4">
                    <Avatar 
                      alt={testimonial.author} 
                      src={testimonial.image} 
                      sx={{ width: 48, height: 48, mr: 2, bgcolor: '#e53e3e' }} 
                    />
                    <Typography variant="subtitle2" fontWeight="bold">
                      - {testimonial.author}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </animated.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="contained" 
            onClick={() => setShowMore(!showMore)}
            sx={{ 
                backgroundColor: '#e53e3e', 
                '&:hover': { backgroundColor: '#c53030' },
                borderRadius: 20
            }}
          >
            {showMore ? "Ver menos testimonios" : "Ver más testimonios"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;