import React from "react";
import styles from "../styles/user.module.css";

interface Props {
  status: "connected" | "connecting" | "disconnected" | "error";
  onRetry?: () => void;
}

export const ConnectionStatus: React.FC<Props> = ({ status, onRetry }) => {
  let text = "";
  let color = "";

  switch (status) {
    case "connected":
      text = "Connected";
      color = "#4caf50";
      break;
    case "connecting":
      text = "Connecting...";
      color = "#ff9800";
      break;
    case "disconnected":
      text = "Disconnected";
      color = "#f44336";
      break;
    case "error":
      text = "Error";
      color = "#e53935";
      break;
    default:
      text = "Unknown";
      color = "#9e9e9e";
  }

  return (
    <div className={styles.connectionStatus} style={{ color }}>
      {text}
      {status !== "connected" && onRetry && (
        <button
          className={styles.retryButton}
          onClick={onRetry}
          style={{ marginLeft: "8px" }}
        >
          Retry
        </button>
      )}
    </div>
  );
};