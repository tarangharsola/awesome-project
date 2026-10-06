import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

export const ConnectionStatus: React.FC = () => {
  const { status, reconnect } = useWebSocket();

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const getClass = () => {
    switch (status) {
      case 'connected':
        return 'status-connected';
      case 'connecting':
        return 'status-connecting';
      case 'disconnected':
        return 'status-disconnected';
      default:
        return '';
    }
  };

  return (
    <div className={`connection-status ${getClass()}`}>
      <span>{getLabel()}</span>
      {status === 'disconnected' && (
        <button className="retry-button" onClick={reconnect}>
          Retry
        </button>
      )}
    </div>
  );
};