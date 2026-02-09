import React, { useState } from "react";
import SpecialPromotions from "./SpecialPromotions.jsx";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { PeopleAlt, Hotel, Send } from "@mui/icons-material";
import { useData } from "../hooks/DataContext.jsx";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import hotelLogo from "../../public/assets/images/icon.png";

function ContactForm() {
  const { reservationData } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    checkIn: reservationData.checkIn || "",
    checkOut: reservationData.checkOut || "",
    adults: reservationData.adults || 1,
    kids: reservationData.kids || 0,
    rooms: reservationData.rooms || 1,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false); // Estado para deshabilitar el formulario después de enviar

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.adults ||
      formData.checkOut <= formData.checkIn // Validación de fechas
    ) {
      setErrorMessage("Todos los campos obligatorios deben completarse y las fechas deben ser válidas.");
      setShowErrorMessage(true);
      return;
    }

    const cartaReserva = `
  <div style="font-family: 'Lato', sans-serif; max-width: 600px; margin: 0 auto;">
    <img src="${hotelLogo}" alt="Hotel Logo" style="display: block; margin: 0 auto; width: 200px;">
    <h2 style="text-align: center; margin-top: 20px;">Confirmación de reserva</h2>
    <p>Estimado/a ${formData.name},</p>
    <p>¡Gracias por tu reserva en nuestro hotel!</p>
    <p>A continuación, te detallamos la información de tu reserva:</p>
    <ul>
      <li>Fecha de entrada: ${formData.checkIn}</li>
      <li>Fecha de salida: ${formData.checkOut}</li>
      <li>Número de adultos: ${formData.adults}</li>
      <li>Número de niños: ${formData.kids}</li>
      <li>Número de habitaciones: ${formData.rooms}</li>
    </ul>
    <p>Esperamos que disfrutes de tu estadía con nosotros.</p>
    <p>Atentamente, Altura Andina Hotel & Spa</p>
    <p>El equipo de nuestro hotel</p>
  </div>
`;

    // Enviar el correo electrónico con los datos del formulario
    try {
      setIsFormDisabled(true); // Deshabilitar el formulario mientras se envía
      await axios.post("http://localhost:5000/send-email", {
        // Cambia la URL a tu endpoint de Node.js
        email: formData.email,
        subject: "Confirmación de reserva",
        text: "¡Gracias por reservar en nuestro hotel!",
        html: cartaReserva,
      });
      setShowSuccessMessage(true);
      setFormData({ // Limpiar el formulario después de enviar
        name: "",
        email: "",
        message: "",
        checkIn: "",
        checkOut: "",
        adults: 1,
        kids: 0,
        rooms: 1,
      });
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      setErrorMessage(
        "Error al enviar el correo electrónico. Inténtalo de nuevo más tarde."
      );
      setShowErrorMessage(true);
    } finally {
      setIsFormDisabled(false); // Habilitar el formulario después de enviar
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 40, friction: 10, bounce: true },
  });

  return (
    <section id="contact-form" className="bg-gray-100 py-12">
      <animated.div style={{ ...formAnimation }} className="container mx-auto">
        <Typography variant="h2" align="center" gutterBottom>
          Reserva ahora
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit} disabled={isFormDisabled}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Completa el formulario
                  </Typography>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Mensaje (Opcional)"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  <FormControl style={{ margin: "0.8rem" }}>
                    <FormLabel htmlFor="check-in">Entrada</FormLabel>
                    <Input
                      id="check-in"
                      type="date"
                      size="small"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl style={{ margin: "0.8rem" }}>
                    <FormLabel htmlFor="check-out">Salida</FormLabel>
                    <Input
                      id="check-out"
                      type="date"
                      size="small"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl style={{ margin: "0.8rem" }}>
                    <FormLabel htmlFor="adults">Adultos</FormLabel>
                    <Select
                      id="adults"
                      size="small"
                      defaultValue={1}
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      startAdornment={<PeopleAlt />}
                    >
                      {[...Array(8).keys()].map((num) => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1} Adultos
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{ margin: "0.8rem" }}>
                    <FormLabel htmlFor="kids">Niños</FormLabel>
                    <Select
                      id="kids"
                      size="small"
                      defaultValue={0}
                      name="kids"
                      value={formData.kids}
                      onChange={handleInputChange}
                      startAdornment={<PeopleAlt />}
                    >
                      {[...Array(8).keys()].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num} Niños
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{ margin: "0.8rem" }}>
                    <FormLabel htmlFor="rooms">Habitaciones</FormLabel>
                    <Select
                      id="rooms"
                      size="small"
                      defaultValue={1}
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      startAdornment={<Hotel />}
                    >
                      {[...Array(8).keys()].map((num) => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1} Habitaciones
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Grid container justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      endIcon={<Send />}
                      disabled={isFormDisabled} // Deshabilitar el botón de enviar mientras se envía
                    >
                      Enviar
                    </Button>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <SpecialPromotions />
          </Grid>
        </Grid>
      </animated.div>
      {/* Alerta de éxito */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
        message="Datos enviados correctamente"
      />
      {/* Alerta de error */}
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={6000}
        onClose={() => setShowErrorMessage(false)}
        message={errorMessage}
      />
    </section>
  );
}

export default ContactForm;
