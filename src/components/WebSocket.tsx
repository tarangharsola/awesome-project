import React, { createContext, useContext } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { ConnectionStatus } from "./ConnectionStatus";

interface WebSocketProviderProps {
  url: string;
  children: React.ReactNode;
}

interface WebSocketContextValue {
  sendMessage: (data: string | ArrayBuffer | Blob) => void;
  status: "connected" | "disconnected" | "reconnecting";
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);

export const useWebSocketContext = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWebSocketContext must be used within WebSocketProvider");
  }
  return ctx;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url, children }) => {
  const { status, sendMessage } = useWebSocket({ url });

  const value = { status, sendMessage };

  return (
    <WebSocketContext.Provider value={value}>
      <ConnectionStatus status={status} />
      {children}
    </WebSocketContext.Provider>
  );
};
