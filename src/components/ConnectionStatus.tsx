import React from "react";
import "./ConnectionStatus.css";

type Status = "connected" | "disconnected" | "reconnecting";

interface Props {
  status: Status;
}

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "connected":
        return "#4caf50";
      case "reconnecting":
        return "#ff9800";
      case "disconnected":
      default:
        return "#f44336";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "reconnecting":
        return "Reconnecting...";
      case "disconnected":
        return "Disconnected";
    }
  };

  return (
    <div className="connection-status" style={{ color: getColor() }}>
      <span className="dot" style={{ backgroundColor: getColor() }} />
      {getLabel()}
    </div>
  );
};
