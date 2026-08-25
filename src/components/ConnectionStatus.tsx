import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

/**
 * Visual indicator of the WebSocket connection status.
 * Shows a colored dot (green = connected, orange = connecting/reconnecting,
 * red = disconnected) alongside a textual label.
 */
const ConnectionStatus: React.FC = () => {
  // The URL is expected to be provided via an environment variable.
  const wsUrl = process.env.REACT_APP_WS_URL || '';
  const { status } = useWebSocket({ url: wsUrl });

  const colorMap: Record<string, string> = {
    connected: '#4caf50', // green
    connecting: '#ff9800', // orange
    reconnecting: '#ff9800', // orange
    disconnected: '#f44336', // red
  };

  const dotStyle: React.CSSProperties = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: colorMap[status] ?? '#9e9e9e',
    marginRight: 8,
    transition: 'background-color 0.3s ease',
  };

  const capitalized = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#e0e0e0' }}>
      <span style={dotStyle} aria-label={`connection-${status}`} />
      <span>{capitalized}</span>
    </div>
  );
};

export default ConnectionStatus;