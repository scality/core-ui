import { createContext, useContext, useState } from 'react';

type HistoryAlertContextType = {
  selectedDate: number | undefined;
  setSelectedDate: (date: number) => void;
};
export const HistoryAlertContext = createContext<
  HistoryAlertContextType | undefined
>(undefined);

export const HistoryAlertProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<number | undefined>(
    undefined,
  );
  return (
    <HistoryAlertContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </HistoryAlertContext.Provider>
  );
};

export const useHistoryAlert = () => {
  const context = useContext(HistoryAlertContext);
  if (!context) {
    return { selectedDate: null };
  }
  return context;
};
