import React, { createContext, useContext } from 'react';
import { useWebSocket, WebSocketStatus } from '../hooks/useWebSocket';
import { ConnectionStatus } from './ConnectionStatus';

type WebSocketProviderProps = {
  url: string;
  children: React.ReactNode;
};

type WSContextType = {
  socket: WebSocket | null;
  sendMessage: (msg: string) => void;
  status: WebSocketStatus;
};

const WSContext = createContext<WSContextType | undefined>(undefined);

/**
 * Provider that establishes a WebSocket connection, handles reconnection with
 * back‑off, and makes the socket, send helper and connection status available
 * via context to the rest of the app.
 */
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url, children }) => {
  const { socket, sendMessage, status } = useWebSocket({ url });

  return (
    <WSContext.Provider value={{ socket, sendMessage, status }}>
      <ConnectionStatus status={status} />
      {children}
    </WSContext.Provider>
  );
};

/**
 * Hook for consuming the WebSocket context.
 */
export const useWebSocketContext = () => {
  const ctx = useContext(WSContext);
  if (!ctx) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return ctx;
};