import React from 'react';
import { useWebSocket, ConnectionStatus as WSStatus } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

interface Props {
  /** URL of the WebSocket server used for the collaborative session */
  url: string;
}

/**
 * Visual indicator of the WebSocket connection state. Shows the current status,
 * the number of reconnection attempts (when applicable), and provides a manual
 * reconnect button when the connection is permanently disconnected.
 */
export const ConnectionStatus: React.FC<Props> = ({ url }) => {
  const { status, retryAttempts, close } = useWebSocket({ url });

  const getColor = (s: WSStatus) => {
    switch (s) {
      case 'connected':
        return '#4caf50'; // green
      case 'connecting':
      case 'retrying':
        return '#ff9800'; // orange
      case 'disconnected':
      default:
        return '#f44336'; // red
    }
  };

  const handleManualReconnect = () => {
    close();
    // Trigger a fresh connection by resetting the hook – easiest way is to reload.
    window.location.reload();
  };

  return (
    <div className="connection-status" style={{ color: getColor(status) }}>
      <span className="status-label">{status.toUpperCase()}</span>
      {status !== 'connected' && (
        <span className="retry-info"> (attempt {retryAttempts})</span>
      )}
      {status === 'disconnected' && (
        <button className="reconnect-btn" onClick={handleManualReconnect}>
          Reconnect
        </button>
      )}
    </div>
  );
};