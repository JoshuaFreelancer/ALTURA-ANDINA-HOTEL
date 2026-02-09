import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Inicializamos con valores por defecto para evitar undefined
  const [reservationData, setReservationData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
    roomType: "Todas",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // MEJORA: Usamos el spread operator (...prev) para no borrar datos previos
  // al actualizar solo un campo.
  const updateReservationData = (newData) => {
    setReservationData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <DataContext.Provider
      value={{
        reservationData,
        updateReservationData,
        showSuccessMessage,
        setShowSuccessMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Validación para asegurar que el hook se usa dentro del Provider
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData debe usarse dentro de un DataProvider");
  }
  return context;
};

export default DataContext;
