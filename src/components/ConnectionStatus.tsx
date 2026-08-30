import React from "react";
import { ConnectionStatus as Status } from "../hooks/useWebSocket";

interface Props {
  status: Status;
}

const statusColors: Record<Status, string> = {
  connected: "#4caf50",
  disconnected: "#f44336",
  reconnecting: "#ff9800",
};

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const color = statusColors[status] ?? "#777";
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color,
        fontWeight: "bold",
      }}
      aria-label={`Connection status: ${label}`}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <span>{label}</span>
    </div>
  );
};