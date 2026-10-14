import React from "react";
import "./ConnectionStatus.css";
import { useConnectionStatus } from "../hooks/useConnectionStatus";

// WebSocket endpoint – can be overridden via environment variable
const WS_URL = process.env.REACT_APP_WS_URL || "ws://localhost:4000";

export const ConnectionStatus: React.FC = () => {
  const { status, reconnect } = useConnectionStatus(WS_URL);

  const label = (() => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      default:
        return "";
    }
  })();

  const className = `connection-status status-${status}`;

  return (
    <div className={className}>
      <span>{label}</span>
      {status === "disconnected" && (
        <button className="retry-button" onClick={reconnect}>
          Retry
        </button>
      )}
    </div>
  );
};