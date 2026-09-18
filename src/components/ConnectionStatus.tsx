import React from 'react';
import './ConnectionStatus.css';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

interface Props {
  status: ConnectionStatus;
}

/**
 * Visual indicator of the WebSocket connection status.
 * Shows green when connected, orange while connecting, and red when disconnected.
 */
const ConnectionStatus: React.FC<Props> = ({ status }) => {
  let color = '';
  let label = '';

  switch (status) {
    case 'connected':
      color = 'var(--color-success, #4caf50)';
      label = 'Connected';
      break;
    case 'connecting':
      color = 'var(--color-warning, #ff9800)';
      label = 'Connecting...';
      break;
    case 'disconnected':
    default:
      color = 'var(--color-error, #f44336)';
      label = 'Disconnected';
      break;
  }

  return (
    <div className="connection-status" style={{ color }} title={label}>
      ● {label}
    </div>
  );
};

export default ConnectionStatus;
