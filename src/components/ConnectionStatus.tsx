import React from 'react';
import './ConnectionStatus.css';

type Props = {
  status: 'connected' | 'disconnected' | 'reconnecting';
};

/**
 * Visual indicator of the WebSocket connection state.
 * Shows a colored dot and textual status.
 */
export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const colorMap: Record<Props['status'], string> = {
    connected: '#4caf50',
    disconnected: '#f44336',
    reconnecting: '#ff9800',
  };

  const textMap: Record<Props['status'], string> = {
    connected: 'Connected',
    disconnected: 'Disconnected',
    reconnecting: 'Reconnecting…',
  };

  return (
    <div className="connection-status" style={{ color: colorMap[status] }}>
      <span
        className="status-indicator"
        style={{
          display: 'inline-block',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: colorMap[status],
          marginRight: 8,
        }}
      />
      {textMap[status]}
    </div>
  );
};