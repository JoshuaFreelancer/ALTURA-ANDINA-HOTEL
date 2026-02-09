import { Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import { MdLocalOffer, MdFreeBreakfast, MdAirplanemodeActive, MdHotel, MdFlightTakeoff } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';

function SpecialPromotions() {
  const promoAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 10, bounce: true }
  });

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <animated.div style={{ ...promoAnimation }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Promociones Especiales
              </Typography>
              <List>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemIcon>
                    <MdLocalOffer fontSize="large" color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="¡Obtén un 20% de descuento en reservas anticipadas!" />
                </ListItem>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemIcon>
                    <MdFreeBreakfast />
                  </ListItemIcon>
                  <ListItemText primary="Desayuno gratis todos los días." />
                </ListItem>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemIcon>
                    <MdAirplanemodeActive />
                  </ListItemIcon>
                  <ListItemText primary="Tour gratuito por la ciudad para huéspedes." />
                </ListItem>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemIcon>
                    <MdHotel />
                  </ListItemIcon>
                  <ListItemText primary="Estacionamiento gratuito para huéspedes." />
                </ListItem>
                <ListItem sx={{ marginBottom: 2 }}>
                  <ListItemIcon>
                    <MdFlightTakeoff />
                  </ListItemIcon>
                  <ListItemText primary="¡Transporte gratuito a lugares de interés locales!" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </animated.div>
      </Grid>
    </Grid>
  );
}

export default SpecialPromotions;
