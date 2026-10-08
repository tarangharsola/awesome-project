import React from "react";
import "./ConnectionStatus.css";
import { ConnectionStatus as Status } from "../types/connectionStatus";

type Props = {
  status: Status;
  onRetry?: () => void;
};

export const ConnectionStatus: React.FC<Props> = ({ status, onRetry }) => {
  const getMessage = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  const getClass = () => {
    switch (status) {
      case "connected":
        return "status-connected";
      case "connecting":
        return "status-connecting";
      case "disconnected":
        return "status-disconnected";
      default:
        return "";
    }
  };

  return (
    <div className={`connection-status ${getClass()}`}>
      <span>{getMessage()}</span>
      {status === "disconnected" && onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};