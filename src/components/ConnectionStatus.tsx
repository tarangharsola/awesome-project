import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

/**
 * Displays the current WebSocket connection status and provides a manual retry button
 * when the connection is not established.
 */
const ConnectionStatus: React.FC<{ url: string }> = ({ url }) => {
  const { status, retry } = useWebSocket(url);

  const colorMap: Record<string, string> = {
    connected: 'green',
    connecting: 'orange',
    disconnected: 'red',
    error: 'red',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ color: colorMap[status] ?? 'gray', fontWeight: 'bold' }}>
        {status}
      </span>
      {status !== 'connected' && (
        <button onClick={retry} style={{ padding: '4px 8px' }}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;