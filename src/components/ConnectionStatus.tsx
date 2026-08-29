import React from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import "./ConnectionStatus.css";

// Build the WebSocket URL based on the current location.
const WS_URL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/ws`;

export const ConnectionStatus: React.FC = () => {
  const { status, manualReconnect } = useWebSocket(WS_URL, Infinity);

  const getColor = () => {
    switch (status) {
      case "connected":
        return "green";
      case "connecting":
        return "orange";
      case "disconnected":
      case "error":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="connection-status" style={{ display: "flex", alignItems: "center" }}>
      <span
        className="status-indicator"
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: getColor(),
          marginRight: 8,
        }}
        title={status}
      />
      <span style={{ marginRight: 12, textTransform: "capitalize" }}>{status}</span>
      {status !== "connected" && (
        <button onClick={manualReconnect} className="retry-button">
          Retry
        </button>
      )}
    </div>
  );
};
