const { cargarHabitacionesDeEjemplo } = require("./roomSeeds");
const { cargarAdmin } = require("./adminSeed");

const ejecutarSemillas = async () => {
  console.log("--- INICIANDO CARGA DE SEMILLAS ---");
  
  // Ejecutamos en orden (await es importante para que no se atropellen)
  await cargarAdmin();
  await cargarHabitacionesDeEjemplo();
  
  console.log("--- CARGA DE SEMILLAS COMPLETADA ---");
};

module.exports = { ejecutarSemillas };