import React, { createContext, useContext, useState, ReactNode } from "react";

export type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface ConnectionStatusContextValue {
  status: ConnectionStatus;
  setStatus: (s: ConnectionStatus) => void;
}

const ConnectionStatusContext = createContext<ConnectionStatusContextValue | undefined>(undefined);

export const ConnectionStatusProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  return (
    <ConnectionStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </ConnectionStatusContext.Provider>
  );
};

export const useConnectionStatusContext = (): ConnectionStatusContextValue => {
  const ctx = useContext(ConnectionStatusContext);
  if (!ctx) {
    throw new Error("useConnectionStatusContext must be used within ConnectionStatusProvider");
  }
  return ctx;
};
