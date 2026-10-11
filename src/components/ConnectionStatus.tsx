import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  /** WebSocket endpoint for the collaborative session */
  url: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ url }) => {
  const { status, reconnect } = useWebSocket(url);

  const getStatusClass = () => {
    switch (status) {
      case 'connected':
        return 'connected';
      case 'connecting':
        return 'connecting';
      case 'disconnected':
      case 'error':
        return 'disconnected';
      default:
        return '';
    }
  };

  return (
    <div className="connection-status">
      <span className={`status-indicator ${getStatusClass()}`} />
      <span className="status-text">{status}</span>
      {(status === 'disconnected' || status === 'error') && (
        <button className="retry-button" onClick={reconnect}>
          Retry
        </button>
      )}
    </div>
  );
};
