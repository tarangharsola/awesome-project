import React from "react";
import "./ConnectionStatus.css";

type Props = {
  status: "connected" | "connecting" | "disconnected";
};

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const label = {
    connected: "Connected",
    connecting: "Connecting...",
    disconnected: "Disconnected",
  }[status];

  return (
    <div className="connection-status">
      <span className={`status-indicator status-${status}`} />
      <span className="status-text">{label}</span>
    </div>
  );
};