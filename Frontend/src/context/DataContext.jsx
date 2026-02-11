import { createContext, useState, useEffect } from "react";

// 1. Creamos el Contexto y lo exportamos (para que el hook lo pueda usar)
export const DataContext = createContext();

const STORAGE_KEY = "altura_andina_reservation";

export const DataProvider = ({ children }) => {
  // Inicialización Perezosa
  const [reservationData, setReservationData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData
        ? JSON.parse(savedData)
        : {
            checkIn: null,
            checkOut: null,
            guests: 1,
            roomType: "Todas",
          };
    } catch (error) {
      console.error("Error localStorage:", error);
      return { checkIn: null, checkOut: null, guests: 1, roomType: "Todas" };
    }
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservationData));
  }, [reservationData]);

  const updateReservationData = (newData) => {
    setReservationData((prev) => ({ ...prev, ...newData }));
  };

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
        resetReservation,
        showSuccessMessage,
        setShowSuccessMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
