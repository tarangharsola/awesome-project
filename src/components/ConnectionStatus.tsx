import React from 'react';
import './ConnectionStatus.css';
import { useWebSocket } from '../hooks/useWebSocket';

export const ConnectionStatus: React.FC = () => {
  const { status, retry } = useWebSocket();

  const getClass = () => {
    switch (status) {
      case 'connected':
        return 'status-connected';
      case 'reconnecting':
        return 'status-reconnecting';
      default:
        return 'status-disconnected';
    }
  };

  return (
    <div className={`connection-status ${getClass()}`}>
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      {status !== 'connected' && (
        <button className="retry-button" onClick={retry}>Retry</button>
      )}
    </div>
  );
};