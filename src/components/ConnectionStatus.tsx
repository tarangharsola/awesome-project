import React from 'react';
import { useWebSocket, ConnectionStatus } from '../hooks/useWebSocket';

interface Props {
  /** WebSocket endpoint for the collaborative session */
  url: string;
}

/**
 * Visual indicator of the WebSocket connection state.
 * Shows a colored dot (green = connected, orange = connecting, red = disconnected)
 * alongside a textual status.
 */
const ConnectionStatusIndicator: React.FC<Props> = ({ url }) => {
  const { status } = useWebSocket(url);

  const getColor = (s: ConnectionStatus) => {
    switch (s) {
      case 'connected':
        return '#4caf50'; // green
      case 'connecting':
        return '#ff9800'; // orange
      case 'disconnected':
      default:
        return '#f44336'; // red
    }
  };

  const color = getColor(status);
  const capitalized = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'inherit' }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block',
          marginRight: 8,
        }}
        aria-label={`connection-${status}`}
      />
      <span>{capitalized}</span>
    </div>
  );
};

export default ConnectionStatusIndicator;