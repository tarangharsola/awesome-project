import React from 'react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import './ConnectionStatus.css';

const WS_URL = process.env.REACT_APP_WS_URL || '';

export const ConnectionStatus: React.FC = () => {
  const { status, retry } = useConnectionStatus(WS_URL);

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
        <button className="retry-button" onClick={retry}>
          Retry
        </button>
      )}
    </div>
  );
};