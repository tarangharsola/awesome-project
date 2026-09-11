import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  /** WebSocket endpoint for the collaborative session */
  url: string;
}

/**
 * ConnectionStatus - visual indicator of the WebSocket connection state.
 * Shows green when connected, orange while reconnecting, and red when disconnected.
 */
export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ url }) => {
  const { status } = useWebSocket(url);

  const getColor = () => {
    switch (status) {
      case 'connected':
        return 'var(--color-success, #28a745)';
      case 'reconnecting':
        return 'var(--color-warning, #ffc107)';
      case 'disconnected':
      default:
        return 'var(--color-danger, #dc3545)';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'reconnecting':
        return 'Reconnecting...';
      case 'disconnected':
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="connection-status" style={{ color: getColor() }}>
      {getLabel()}
    </div>
  );
};

export default ConnectionStatus;
