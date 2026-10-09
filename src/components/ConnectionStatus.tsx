import React from "react";
import "./ConnectionStatus.css";

type Props = {
  status: "connecting" | "connected" | "disconnected" | "error";
  onRetry?: () => void;
};

export const ConnectionStatus: React.FC<Props> = ({ status, onRetry }) => {
  const getLabel = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      case "error":
        return "Error";
      default:
        return "";
    }
  };

  const getClass = () => {
    switch (status) {
      case "connected":
        return "status-indicator connected";
      case "connecting":
        return "status-indicator connecting";
      case "disconnected":
        return "status-indicator disconnected";
      case "error":
        return "status-indicator error";
      default:
        return "status-indicator";
    }
  };

  return (
    <div className="connection-status">
      <span className={getClass()} />
      <span className="status-text">{getLabel()}</span>
      {(status === "disconnected" || status === "error") && onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};