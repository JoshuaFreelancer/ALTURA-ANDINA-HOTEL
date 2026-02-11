import React, { createContext, useState, useEffect } from 'react';
import hotelApi from '../services/api';

// Exportamos el contexto para el hook
export const RoomContext = createContext();

// Renombramos a 'RoomProvider' para consistencia
export const RoomProvider = ({ children }) => {
  const [allHabitaciones, setAllHabitaciones] = useState([]);
  const [filteredHabitaciones, setFilteredHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarHabitaciones = async () => {
      try {
        setLoading(true);
        // Recuerda: hotelApi ya tiene la baseURL configurada
        const { data } = await hotelApi.get('/rooms'); 
        
        setAllHabitaciones(data);
        setFilteredHabitaciones(data);
        
      } catch (err) {
        console.error("Error API:", err);
        setError(err.message || "Error al cargar habitaciones.");
      } finally {
        setLoading(false);
      }
    };

    cargarHabitaciones();
  }, []);

  const resetFilters = () => {
    setFilteredHabitaciones(allHabitaciones);
  };

  return (
    <RoomContext.Provider 
      value={{ 
        habitaciones: allHabitaciones,
        filteredHabitaciones,
        setFilteredHabitaciones,
        resetFilters,
        loading, 
        error 
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;