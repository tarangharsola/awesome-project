import React from 'react';
import './ConnectionStatus.css';
import { ConnectionStatus } from '../hooks/useWebSocket';

interface Props {
  status: ConnectionStatus;
}

/**
 * Visual indicator of the WebSocket connection status.
 * Shows a colored dot and text: Connected (green), Connecting (yellow), Disconnected (red).
 */
const ConnectionStatusIndicator: React.FC<Props> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'connected':
        return 'green';
      case 'connecting':
        return 'orange';
      case 'disconnected':
        return 'red';
      default:
        return 'gray';
    }
  };

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

  return (
    <div className="connection-status">
      <span
        className="status-dot"
        style={{ backgroundColor: getColor() }}
        aria-label={getLabel()}
      />
      <span className="status-text">{getLabel()}</span>
    </div>
  );
};

export default ConnectionStatusIndicator;
