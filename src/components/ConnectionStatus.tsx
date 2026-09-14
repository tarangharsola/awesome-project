import React from 'react';
import './ConnectionStatus.css';
import { ConnectionStatus } from '../hooks/useWebSocket';
import { useWebSocket } from '../hooks/useWebSocket';

interface Props {
  url: string;
  onMessage: (msg: any) => void;
}

export const ConnectionStatusIndicator: React.FC<Props> = ({ url, onMessage }) => {
  const { status, manualRetry } = useWebSocket({ url, onMessage });

  const getStatusClass = () => {
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
    <div className="connection-status">
      <span className={`status-dot ${getStatusClass()}`} />
      <span className="status-text">{status}</span>
      {status === 'disconnected' && (
        <button className="retry-button" onClick={manualRetry}>
          Retry
        </button>
      )}
    </div>
  );
};