import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";

import CheckoutForm from "./CheckoutForm";
import hotelApi from "../../services/api";

// Cargar la llave pública (fuera del componente para no recargarla)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({ isOpen, onClose, bookingData, onSuccess }) => {
  const [clientSecret, setClientSecret] = useState("");

  // Al abrir el modal, pedimos al backend la intención de pago
  useEffect(() => {
    if (isOpen) {
      // Calcular noches (ejemplo simple)
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const diffTime = Math.abs(end - start);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

      hotelApi
        .post("/services/create-payment-intent", {
          roomId: "id_temporal", // Aquí enviarías el ID real
          nights: nights,
          guests: bookingData.adults + bookingData.kids,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Error iniciando pago", err));
    }
  }, [isOpen, bookingData]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#6998A7", // Tu brand.500
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent borderRadius="xl">
        <ModalHeader
          color="brand.600"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          Finalizar Reserva Segura
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8} pt={6}>
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                totalAmount={150 * 1} // Pasa el monto real aquí
                bookingDetails={bookingData}
                onSuccess={onSuccess}
              />
            </Elements>
          ) : (
            <Center py={10} flexDirection="column">
              <Spinner size="xl" color="brand.500" mb={4} />
              <Text color="gray.500">Conectando con el banco...</Text>
            </Center>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
