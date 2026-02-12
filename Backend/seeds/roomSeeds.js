const Room = require("../models/Room");

const habitacionesDeEjemplo = [
  {
    roomNumber: 101, 
    title: "Deluxe Vista a la Sierra", 
    roomType: "Doble",
    description: "Excelente habitación con una vista impresionante de la Sierra Nevada, ideal para parejas que buscan un escape romántico en la montaña.",
    amenities: ["Cama king-size", "Baño privado", "Balcón con vista a la montaña", "TV de pantalla plana", "Calefacción"],
    // 🔥 URL OPTIMIZADA: q_auto:best (Máxima calidad), f_auto (Mejor formato), w_1920 (Full HD)
    images: ["https://res.cloudinary.com/drfyy4i0s/image/upload/q_auto:best,f_auto,w_1920,c_limit/v1770905620/visualsofdana-T5pL6ciEn-I-unsplash_jxibs9.jpg"], 
    pricePerNight: 200,
    capacity: 2, // Ajustado a capacidad realista de King size
    averageRating: 4.8,
    isAvailable: true
  },
  {
    roomNumber: 102,
    title: "Suite Familiar Andina",
    roomType: "Familiar",
    description: "Espaciosa habitación perfecta para familias grandes, con áreas separadas para mayor comodidad.",
    amenities: ["Dos camas queen-size", "Baño privado", "Área de estar", "Wi-Fi gratuito"], // Baño privado para una suite
    // 🔥 URL OPTIMIZADA
    images: ["https://res.cloudinary.com/drfyy4i0s/image/upload/q_auto:best,f_auto,w_1920,c_limit/v1770905614/point3d-commercial-imaging-ltd-5BV56SdvLmo-unsplash_ve975p.jpg"],
    pricePerNight: 180,
    capacity: 5, // Ajustado a capacidad realista
    averageRating: 4.5,
    isAvailable: true
  },
  {
    roomNumber: 201,
    title: "Estándar Ciudad",
    roomType: "Doble",
    description: "Buena habitación con una vista agradable a la ciudad de Mérida y el teleférico.",
    amenities: ["Cama matrimonial", "Baño privado", "Ventana con vista a la ciudad"],
    // 🔥 URL OPTIMIZADA
    images: ["https://res.cloudinary.com/drfyy4i0s/image/upload/q_auto:best,f_auto,w_1920,c_limit/v1770905610/Estandar_gfg25d.jpg"],
    pricePerNight: 150,
    capacity: 2,
    averageRating: 4.2,
    isAvailable: true
  },
  {
    roomNumber: 202,
    title: "Individual Económica",
    roomType: "Individual",
    description: "Habitación sencilla pero confortable, ideal para viajeros solitarios o mochileros.",
    amenities: ["Cama individual", "Baño compartido", "Escritorio"],
    // 🔥 URL OPTIMIZADA
    images: ["https://res.cloudinary.com/drfyy4i0s/image/upload/q_auto:best,f_auto,w_1920,c_limit/v1770905607/Ejecutiva_ql6cwm.jpg"],
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
    // 🔥 URL OPTIMIZADA
    images: ["https://res.cloudinary.com/drfyy4i0s/image/upload/q_auto:best,f_auto,w_1920,c_limit/v1770905605/Lujo_xpvpoq.jpg"],
    pricePerNight: 300,
    capacity: 4,
    averageRating: 5.0,
    isAvailable: true
  }
];

const cargarHabitacionesDeEjemplo = async () => {
  try {
    // 1. Verificar si ya existen datos
    const count = await Room.countDocuments();
    
    // IMPORTANTE: Para que los cambios de imagen surtan efecto,
    // necesitas que se ejecute la inserción.
    // Si 'count > 0', este bloque returna y NO actualiza nada.
    // Para forzar la actualización, comenta estas líneas temporalmente o borra la colección en MongoDB Compass.
    if (count > 0) {
      console.log('✅ Base de datos ya inicializada. No se cargaron semillas nuevas.');
      // return; // <--- COMENTA ESTO PARA FORZAR LA ACTUALIZACIÓN DE IMÁGENES
    }

    // Opcional: Borrar todo antes de insertar para asegurar que quede limpio
    // await Room.deleteMany({}); 

    // 2. Insertar datos masivamente
    await Room.insertMany(habitacionesDeEjemplo);
    console.log('🌱 Habitaciones de ejemplo cargadas exitosamente con IMÁGENES HD (Seeding complete)');
    
  } catch (error) {
    console.error('❌ Error al cargar las semillas:', error);
    // No detenemos el proceso (process.exit) para que el servidor siga intentando arrancar si es un error menor
  }
};

module.exports = { cargarHabitacionesDeEjemplo };