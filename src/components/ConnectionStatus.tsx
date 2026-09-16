import React from 'react';
import './ConnectionStatus.css';

type Props = {
  connected: boolean;
  reconnectAttempts: number;
};

export const ConnectionStatus: React.FC<Props> = ({ connected, reconnectAttempts }) => {
  const statusClass = connected ? 'connected' : 'disconnected';
  const message = connected
    ? 'Connected'
    : `Disconnected (retries: ${reconnectAttempts})`;
  return <div className={`connection-status ${statusClass}`}>{message}</div>;
};
