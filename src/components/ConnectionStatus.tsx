import React from 'react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import './ConnectionStatus.css';

/**
 * Visual indicator of the WebSocket connection status.
 * Shows a colored dot and text. When disconnected, a retry button is displayed.
 */
export const ConnectionStatus: React.FC = () => {
  const { status, manualReconnect } = useConnectionStatus();

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'green';
      case 'connecting':
        return 'orange';
      case 'error':
        return 'red';
      case 'disconnected':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <div className="connection-status" title={`WebSocket status: ${status}`}> 
      <span
        className="status-indicator"
        style={{ backgroundColor: getStatusColor() }}
      />
      <span className="status-text">{status}</span>
      {status === 'disconnected' || status === 'error' ? (
        <button className="retry-button" onClick={manualReconnect}>
          Retry
        </button>
      ) : null}
    </div>
  );
};
