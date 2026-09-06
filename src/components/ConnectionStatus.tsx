import React from "react";
import { useWebSocket } from "../hooks/useWebSocket";

// The WebSocket endpoint can be configured via an environment variable.
const WS_URL = process.env.REACT_APP_WS_URL || "ws://localhost:4000";

export const ConnectionStatus: React.FC = () => {
  const { status } = useWebSocket({ url: WS_URL });

  const colorMap: Record<string, string> = {
    connected: "#4caf50",
    connecting: "#ff9800",
    disconnected: "#f44336",
  };

  const displayText = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div
      style={{
        padding: "4px 8px",
        backgroundColor: "#222",
        color: colorMap[status] ?? "#fff",
        borderRadius: "4px",
        fontSize: "0.9rem",
        fontFamily: "sans-serif",
      }}
      aria-label="connection-status"
    >
      {displayText}
    </div>
  );
};
