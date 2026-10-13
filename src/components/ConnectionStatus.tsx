import React from "react";
import { useConnectionStatusContext } from "../context/ConnectionStatusContext";
import "./ConnectionStatus.css";

export const ConnectionStatus = () => {
  const { status } = useConnectionStatusContext();

  const getLabel = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "reconnecting":
        return "Reconnecting...";
      case "disconnected":
      default:
        return "Disconnected";
    }
  };

  const getClass = () => {
    switch (status) {
      case "connected":
        return "status-connected";
      case "reconnecting":
        return "status-reconnecting";
      case "disconnected":
      default:
        return "status-disconnected";
    }
  };

  return <div className={`connection-status ${getClass()}`}>{getLabel()}</div>;
};
