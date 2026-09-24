import React from 'react';
import './ConnectionStatus.css';
import { useWebSocket } from '../hooks/useWebSocket';

export const ConnectionStatus: React.FC = () => {
  const { status } = useWebSocket();

  const statusClass = (() => {
    switch (status) {
      case 'connected':
        return 'connected';
      case 'connecting':
        return 'connecting';
      default:
        return 'disconnected';
    }
  })();

  return (
    <div className={`connection-status ${statusClass}`}>Status: {status}</div>
  );
};
