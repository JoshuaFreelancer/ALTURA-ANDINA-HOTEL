import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import hotelApi from "../../services/api";

export default function CheckoutForm({
  totalAmount,
  bookingDetails,
  onSuccess,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe no ha cargado todavía
      return;
    }

    setIsLoading(true);

    // 1. Confirmar el pago con Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirección de seguridad (obligatoria en algunos métodos de pago)
        // Como estamos en una SPA, manejamos esto con cuidado.
        return_url: `${window.location.origin}/pago-completado`,
      },
      redirect: "if_required", // IMPORTANTE: Evita redirección si es tarjeta de crédito
    });

    if (error) {
      setMessage(error.message);
      toast({
        title: "Error en el pago",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      // 2. ¡PAGO EXITOSO!
      toast({
        title: "¡Pago Aprobado!",
        description: "Tu reserva ha sido confirmada.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Aquí llamamos a la función para guardar en MongoDB y enviar correo
      onSuccess();
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} id="payment-form">
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold" color="brand.600" mb={2}>
          Total a pagar: ${totalAmount}
        </Text>

        {/* Este componente mágico de Stripe renderiza los inputs de tarjeta */}
        <Box
          border="1px solid"
          borderColor="gray.200"
          p={4}
          borderRadius="md"
          bg="white"
        >
          <PaymentElement id="payment-element" />
        </Box>

        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
          colorScheme="brand"
          bg="brand.500"
          size="lg"
          w="full"
          mt={4}
          isLoading={isLoading}
          loadingText="Procesando..."
        >
          Pagar Ahora
        </Button>

        {message && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
