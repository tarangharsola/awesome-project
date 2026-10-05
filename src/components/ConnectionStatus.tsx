import React from 'react';
import './ConnectionStatus.css';

type ConnectionStatusProps = {
  status: 'connected' | 'connecting' | 'disconnected';
};

/**
 * Visual indicator of the WebSocket connection status.
 * Green dot = connected, orange dot = connecting, red dot = disconnected.
 */
export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'connected':
        return '#4caf50'; // green
      case 'connecting':
        return '#ff9800'; // orange
      case 'disconnected':
      default:
        return '#f44336'; // red
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="connection-status">
      <span
        className="status-indicator"
        style={{ backgroundColor: getColor() }}
        aria-label={getLabel()}
      />
      <span className="status-label">{getLabel()}</span>
    </div>
  );
};