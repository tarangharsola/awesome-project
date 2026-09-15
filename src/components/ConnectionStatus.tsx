import React from 'react';
import './ConnectionStatus.css';
import { useWebSocket } from '../hooks/useWebSocket';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:4000';

export const ConnectionStatus: React.FC = () => {
  const { status, reconnect } = useWebSocket(WS_URL);

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'reconnecting':
        return 'Reconnecting...';
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
      case 'reconnecting':
        return 'status-reconnecting';
      case 'disconnected':
        return 'status-disconnected';
      default:
        return '';
    }
  };

  return (
    <div className={`connection-status ${getClass()}`}>
      <span>{getLabel()}</span>
      {status !== 'connected' && (
        <button className="retry-button" onClick={reconnect}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;