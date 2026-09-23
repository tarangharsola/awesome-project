import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const ConnectionStatus: React.FC = () => {
  const { connectionStatus } = useWebSocket();

  const statusMap: Record<string, { text: string; color: string }> = {
    connected: { text: 'Connected', color: '#4caf50' },
    disconnected: { text: 'Disconnected', color: '#f44336' },
    reconnecting: { text: 'Reconnecting…', color: '#ff9800' },
  };

  const { text, color } = statusMap[connectionStatus] || {
    text: 'Unknown',
    color: '#9e9e9e',
  };

  return (
    <div className="connection-status" style={{ color }} title={`WebSocket: ${connectionStatus}`}>
      {text}
    </div>
  );
};

export default ConnectionStatus;
