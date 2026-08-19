import React from "react";
import { useWebSocket } from "../utils/hooks/useWebSocket";

interface Props {
  url: string;
  children: (ws: WebSocket | null, state: any) => React.ReactNode;
}

/**
 * Simple provider component that supplies a WebSocket instance and its state to children.
 */
export const WebSocketProvider: React.FC<Props> = ({ url, children }) => {
  const [ws, state] = useWebSocket({ url });
  return <>{children(ws, state)}</>;
};
