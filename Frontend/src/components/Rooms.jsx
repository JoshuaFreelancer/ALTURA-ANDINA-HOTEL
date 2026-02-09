import { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Modal, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Close, People } from '@mui/icons-material';
import { useHabitaciones } from '../hooks/useHabitacionesContext';

const Habitaciones = () => {
  const { habitaciones } = useHabitaciones();
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const handleVerDetalles = (habitacion) => {
    setSelectedHabitacion(habitacion);
  };

  const handleCloseModal = () => {
    setSelectedHabitacion(null);
  };

  const handleSubmitReview = () => {
    setReviewText('');
    handleCloseModal();
  };

  return (
    <div className="container mx-auto">
      <Typography variant="h4" gutterBottom className="my-4">
        Habitaciones Disponibles
      </Typography>
      <Grid container spacing={3}>
        {habitaciones.map(habitacion => (
          <Grid item xs={12} sm={6} md={4} key={habitacion._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" className="mb-2">
                  {habitacion.descripcion}
                </Typography>
                <div className="flex justify-center items-center mb-2">
                  {habitacion.imagenes.length > 0 ? (
                    <img src={habitacion.imagenes[0]} alt={habitacion.descripcion} className="w-full h-auto" />
                  ) : (
                    <Typography variant="body2" color="textSecondary">No hay imagen disponible</Typography>
                  )}
                </div>
                <Typography color="textSecondary" className="mb-2">
                  <People /> Capacidad Máxima: {habitacion.capacidadMaxima} personas
                </Typography>
              </CardContent>
              <CardActions className="justify-between">
                <Button size="small" color="primary" onClick={() => handleVerDetalles(habitacion)}>
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar más detalles y dejar un review */}
      <Modal open={selectedHabitacion !== null} onClose={handleCloseModal}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <Paper elevation={3} className="w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" gutterBottom>
                Detalles de la Habitación
              </Typography>
              <Button onClick={handleCloseModal}>
                <Close />
              </Button>
            </div>
            <Typography color="textSecondary" className="mb-2">
              Descripción: {selectedHabitacion?.descripcion}
            </Typography>
            <Typography color="textSecondary" className="mb-2">
              Capacidad Máxima: {selectedHabitacion?.capacidadMaxima} personas
            </Typography>
            <Typography color="textSecondary" className="mb-2">
              {/* Agrega más detalles de la habitación aquí */}
            </Typography>
            <TextField
              label="Deja tu review"
              variant="outlined"
              fullWidth
              multiline
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mb-4"
            />
            <Button variant="contained" color="primary" onClick={handleSubmitReview}>
              Enviar Review
            </Button>
          </Paper>
        </div>
      </Modal>
    </div>
  );
};

export default Habitaciones;
