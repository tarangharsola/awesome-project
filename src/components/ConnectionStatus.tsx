import React from 'react';
import './ConnectionStatus.css';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

type Props = {
  status: ConnectionStatus;
};

/**
 * Visual indicator of the WebSocket connection status.
 * Shows a colored dot (green=connected, orange=connecting, red=disconnected)
 * alongside a textual label.
 */
export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const colorMap: Record<ConnectionStatus, string> = {
    connected: '#4caf50',
    connecting: '#ff9800',
    disconnected: '#f44336',
  };

  return (
    <div className="connection-status">
      <span
        className="status-indicator"
        style={{ backgroundColor: colorMap[status] }}
        aria-label={`connection-${status}`}
      />
      <span className="status-text">{status}</span>
    </div>
  );
};
