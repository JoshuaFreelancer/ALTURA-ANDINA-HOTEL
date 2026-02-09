import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

// Clave para guardar en el navegador
const STORAGE_KEY = "altura_andina_reservation";

export const DataProvider = ({ children }) => {
  // 1. Inicialización "Perezosa" (Lazy Initializer)
  // Buscamos en localStorage antes de iniciar. Si no hay nada, usamos defaults.
  const [reservationData, setReservationData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : {
        checkIn: null,  // null o string ISO
        checkOut: null,
        guests: 1,
        roomType: "Todas",
      };
    } catch (error) {
      console.error("Error leyendo localStorage:", error);
      return { checkIn: null, checkOut: null, guests: 1, roomType: "Todas" };
    }
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // 2. Efecto de Persistencia
  // Cada vez que reservationData cambie, lo guardamos automáticamente.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservationData));
  }, [reservationData]);

  // 3. Función de Actualización Inteligente
  const updateReservationData = (newData) => {
    setReservationData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // 4. Función de Reset (Nueva)
  // Útil para llamar cuando la reserva se completa con éxito
  const resetReservation = () => {
    const defaultState = {
      checkIn: null,
      checkOut: null,
      guests: 1,
      roomType: "Todas",
    };
    setReservationData(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DataContext.Provider
      value={{
        reservationData,
        updateReservationData,
        resetReservation, // Exportamos la nueva función
        showSuccessMessage,
        setShowSuccessMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData debe usarse dentro de un DataProvider");
  }
  return context;
};

export default DataContext;