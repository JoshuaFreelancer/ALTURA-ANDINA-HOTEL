const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Room = require('../models/Room'); // Importamos tu modelo para ver precios reales

const createPaymentIntent = async (req, res) => {
  const { roomId, nights, guests } = req.body;

  try {
    // 1. BUSCAR LA HABITACIÓN EN LA DB (Seguridad: Precio Real)
    // Si no tienes DB llena aun, puedes hardcodear un precio temporalmente
    // const room = await Room.findById(roomId); 
    // const pricePerNight = room.pricePerNight;
    
    // --- SIMULACIÓN (Hasta que tengas la DB llena) ---
    const pricePerNight = 150; // $150 USD por noche (ejemplo)
    const roomTitle = "Suite Andina Lujo";
    // --------------------------------------------------

    // 2. CALCULAR MONTO TOTAL
    // Stripe cobra en CENTAVOS. $150.00 = 15000 centavos
    const totalAmount = pricePerNight * nights * 100;

    // 3. CREAR LA INTENCIÓN DE PAGO
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      // Metadatos: Información útil para ver en el Dashboard de Stripe
      metadata: {
        room: roomTitle,
        nights: nights,
        guests: guests
      }
    });

    // 4. ENVIAR EL "SECRETO" AL FRONTEND
    // El frontend necesita este 'client_secret' para mostrar el formulario
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("❌ Error Stripe:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createPaymentIntent };