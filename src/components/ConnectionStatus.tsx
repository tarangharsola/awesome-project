import React from "react";
import "./ConnectionStatus.css";

type Props = {
  status: "connected" | "disconnected" | "reconnecting";
};

const statusColors: Record<Props["status"], string> = {
  connected: "#4caf50",
  disconnected: "#f44336",
  reconnecting: "#ff9800",
};

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const color = statusColors[status];
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div className="connection-status" style={{ color }}>
      <span className="dot" style={{ backgroundColor: color, display: "inline-block", width: 8, height: 8, borderRadius: "50%", marginRight: 4 }} />
      {label}
    </div>
  );
};