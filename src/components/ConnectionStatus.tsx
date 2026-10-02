import React from 'react';
import './ConnectionStatus.css';
import { ConnectionStatus } from '../hooks/useWebSocket';

type Props = {
  status: ConnectionStatus;
};

/**
 * Visual indicator of WebSocket connection status.
 * Green = connected, Orange = connecting, Red = disconnected (reconnecting).
 */
const ConnectionStatusIndicator: React.FC<Props> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'connected':
        return 'var(--color-success)';
      case 'connecting':
        return 'var(--color-warning)';
      case 'disconnected':
        return 'var(--color-danger)';
      default:
        return 'inherit';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected – Reconnecting';
      default:
        return '';
    }
  };

  return (
    <div className="connection-status" style={{ color: getColor() }}>
      {getLabel()}
    </div>
  );
};

export default ConnectionStatusIndicator;