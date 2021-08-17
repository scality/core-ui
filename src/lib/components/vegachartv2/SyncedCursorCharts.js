//@flow
import React, { type Node, useState, createContext, useContext } from 'react';

export const SyncedCursorChartsContext = createContext<{
  cursorX: number,
  setCursorX: (cursorX: number) => void,
} | null>(null);

export const useCursorX = (): ({
  cursorX: number,
  setCursorX: (cursorX: number) => void,
} | null) => {
  const contextValue = useContext(SyncedCursorChartsContext);
  if (contextValue === null) {
    console.error("Can't use useCursorX() outside SyncedCursorCharts");
  }
  return contextValue;
};

export function SyncedCursorCharts({ children }: { children: Node }) {
  const [cursorX, setCursorX] = useState(0);

  return (
    <SyncedCursorChartsContext.Provider value={{ cursorX, setCursorX }}>
      {children}
    </SyncedCursorChartsContext.Provider>
  );
}
