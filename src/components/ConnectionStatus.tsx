import React from "react";
import { useWebSocket, WebSocketStatus } from "../hooks/useWebSocket";

interface ConnectionStatusProps {
  url: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ url }) => {
  const { status, manualReconnect } = useWebSocket({ url });

  const getColor = (s: WebSocketStatus) => {
    switch (s) {
      case "connected":
        return "#4caf50"; // green
      case "connecting":
        return "#ff9800"; // orange
      case "disconnected":
        return "#f44336"; // red
      default:
        return "#9e9e9e"; // grey
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        backgroundColor: "#212121",
        color: "#fff",
      }}
    >
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: getColor(status),
          display: "inline-block",
        }}
        aria-label={`connection-${status}`}
      />
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      {status === "disconnected" && (
        <button
          onClick={manualReconnect}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "1px solid #fff",
            color: "#fff",
            padding: "0.25rem 0.5rem",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};
