import { createContext, useContext, type ReactNode } from "react";

interface LayoutContextType {
  // Reservado para futura funcionalidad si se necesita
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <LayoutContext.Provider value={{}}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
