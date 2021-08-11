//@flow
import React, { type Node, useState, createContext, useContext } from 'react';

export const SyncedCursorChartsContext = createContext(null);

export const useCursorX = (): ({
  cursorX: Date,
  setCursorX: (Date) => void,
}) => {
  const contextValue = useContext(SyncedCursorChartsContext);
  if (contextValue === null) {
    console.log("Can't use useCursorX() outside SyncedCursorCharts");
  }
  return contextValue;
};

export function SyncedCursorCharts({ children }: { children: Node }) {
  const [cursorX, setCursorX] = useState(null);

  return (
    <SyncedCursorChartsContext.Provider value={{ cursorX, setCursorX }}>
      {children}
    </SyncedCursorChartsContext.Provider>
  );
}
