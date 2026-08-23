import React from "react";
import { useWebSocket, WebSocketStatus } from "../hooks/useWebSocket";

/**
 * Simple visual indicator of the WebSocket connection state.
 * It uses the same reconnection logic as the rest of the app, ensuring the UI
 * reflects real‑time connectivity.
 */
interface ConnectionStatusProps {
  /** URL of the WebSocket server – typically passed from a config or env */
  url: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ url }) => {
  const { status } = useWebSocket({ url });

  const backgroundColor: Record<WebSocketStatus, string> = {
    connected: "#28a745",
    connecting: "#ffc107",
    disconnected: "#dc3545",
  };

  const label: Record<WebSocketStatus, string> = {
    connected: "Connected",
    connecting: "Connecting…",
    disconnected: "Disconnected",
  };

  return (
    <div
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: backgroundColor[status],
        color: "white",
        fontSize: "0.85rem",
        fontWeight: 500,
        display: "inline-block",
      }}
      aria-live="polite"
      aria-label={`WebSocket ${status}`}
    >
      {label[status]}
    </div>
  );
};
