import React from 'react';
import { useWebSocket } from '../utils/hooks/useWebSocket';

interface ConnectionStatusProps {
  /**
   * WebSocket endpoint used by the application. The same URL should be passed to other
   * parts of the app that rely on the hook so that a single connection is shared.
   */
  url: string;
}

/**
 * Visual indicator of the WebSocket connection state.
 * Shows "connected" (green), "reconnecting" (orange) or "disconnected" (red).
 */
const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ url }) => {
  const { status } = useWebSocket(url);

  const colorMap: Record<string, string> = {
    connected: '#4caf50', // green
    reconnecting: '#ff9800', // orange
    disconnected: '#f44336', // red
  };

  const style: React.CSSProperties = {
    color: colorMap[status] ?? '#fff',
    fontWeight: 'bold',
    marginLeft: '1rem',
  };

  return (
    <div style={style} data-testid="connection-status">
      Connection: {status}
    </div>
  );
};

export default ConnectionStatus;
