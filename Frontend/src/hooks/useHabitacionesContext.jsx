import React, { createContext, useState, useEffect, useContext } from 'react';
import hotelApi from '../services/api'; // Importamos tu instancia configurada

const HabitacionesContext = createContext();

export const useHabitaciones = () => {
  const context = useContext(HabitacionesContext);
  if (!context) {
    throw new Error("useHabitaciones debe usarse dentro de un HabitacionesProvider");
  }
  return context;
};

export const HabitacionesProvider = ({ children }) => {
  // 1. ESTADO "MAESTRO" (La fuente de la verdad, nunca se borra)
  const [allHabitaciones, setAllHabitaciones] = useState([]);
  
  // 2. ESTADO "VISTA" (Lo que se muestra en pantalla, puede filtrarse)
  const [filteredHabitaciones, setFilteredHabitaciones] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarHabitaciones = async () => {
      try {
        setLoading(true);
        // Usamos '/rooms' porque la baseURL ya es '.../api'
        // Esto asume que tu backend tiene la ruta router.get('/', ...) en roomRoutes
        const { data } = await hotelApi.get('/rooms'); 
        
        setAllHabitaciones(data);      // Guardamos la copia original
        setFilteredHabitaciones(data); // Inicialmente mostramos todo
        
      } catch (err) {
        console.error("Error cargando habitaciones:", err);
        setError(err.message || "No se pudieron cargar las habitaciones.");
      } finally {
        setLoading(false);
      }
    };

    cargarHabitaciones();
  }, []);

  // Función auxiliar para reiniciar filtros fácilmente
  const resetFilters = () => {
    setFilteredHabitaciones(allHabitaciones);
  };

  return (
    <HabitacionesContext.Provider 
      value={{ 
        habitaciones: allHabitaciones, // Exportamos la lista COMPLETA para que el filtro sepa dónde buscar
        filteredHabitaciones,          // Exportamos la lista FILTRADA para renderizar
        setFilteredHabitaciones,       // Función para actualizar la vista
        resetFilters,
        loading, 
        error 
      }}
    >
      {children}
    </HabitacionesContext.Provider>
  );
};