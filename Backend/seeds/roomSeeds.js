const Room = require("../models/Room");

const habitacionesDeEjemplo = [
  {
    roomNumber: 101, // Nuevo: Requerido por el modelo
    title: "Deluxe Vista al Mar", // Nuevo
    roomType: "Doble", // Debe coincidir con el enum del modelo
    description: "Excelente habitación con una vista impresionante al mar, ideal para parejas que buscan un escape romántico.",
    amenities: ["Cama king-size", "Baño privado", "Balcón con vista al mar", "TV de pantalla plana"],
    images: ["/assets/images/room1.jpg", "/assets/images/room2.jpg"], // Rutas relativas o URLs
    pricePerNight: 200, // Simplificado de 'tarifas'
    capacity: 4,
    averageRating: 4.8,
    isAvailable: true
  },
  {
    roomNumber: 102,
    title: "Suite Familiar",
    roomType: "Familiar",
    description: "Espaciosa habitación perfecta para familias grandes, con áreas separadas para mayor comodidad.",
    amenities: ["Dos camas queen-size", "Baño compartido", "Área de estar", "Wi-Fi gratuito"],
    images: ["/assets/images/room3.jpg", "/assets/images/room4.jpg"],
    pricePerNight: 180,
    capacity: 8,
    averageRating: 4.5,
    isAvailable: true
  },
  {
    roomNumber: 201,
    title: "Estándar Ciudad",
    roomType: "Doble",
    description: "Buena habitación con una vista agradable a la ciudad de Mérida y el teleférico.",
    amenities: ["Cama matrimonial", "Baño privado", "Ventana con vista a la ciudad"],
    images: ["/assets/images/room5.jpg", "/assets/images/room6.jpg"],
    pricePerNight: 150,
    capacity: 3,
    averageRating: 4.2,
    isAvailable: true
  },
  {
    roomNumber: 202,
    title: "Individual Económica",
    roomType: "Individual",
    description: "Habitación sencilla pero confortable, ideal para viajeros solitarios o mochileros.",
    amenities: ["Cama individual", "Baño compartido", "Escritorio"],
    images: ["/assets/images/room7.jpg", "/assets/images/room8.jpg"],
    pricePerNight: 100,
    capacity: 1,
    averageRating: 3.9,
    isAvailable: true
  },
  {
    roomNumber: 301,
    title: "Grand Suite Presidencial",
    roomType: "Suite",
    description: "Experiencia de alojamiento de lujo con la mejor vista de los Andes y servicios exclusivos.",
    amenities: ["Cama king-size", "Baño de lujo", "Sala de estar privada", "Terraza panorámica", "Jacuzzi"],
    images: ["/assets/images/room9.jpg", "/assets/images/room10.jpg"],
    pricePerNight: 300,
    capacity: 6,
    averageRating: 5.0,
    isAvailable: true
  }
];

const cargarHabitacionesDeEjemplo = async () => {
  try {
    // 1. Verificar si ya existen datos
    const count = await Room.countDocuments();
    
    if (count > 0) {
      console.log('✅ Base de datos ya inicializada. No se cargaron semillas.');
      return;
    }

    // 2. Insertar datos masivamente
    await Room.insertMany(habitacionesDeEjemplo);
    console.log('🌱 Habitaciones de ejemplo cargadas exitosamente (Seeding complete)');
    
  } catch (error) {
    console.error('❌ Error al cargar las semillas:', error);
    // No detenemos el proceso (process.exit) para que el servidor siga intentando arrancar si es un error menor
  }
};

module.exports = { cargarHabitacionesDeEjemplo };