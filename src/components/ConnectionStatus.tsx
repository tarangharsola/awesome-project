import React from 'react';
import { useWebSocket } from '../utils/useWebSocket';

// Assuming the WebSocket URL is provided via environment or context
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

const ConnectionStatus: React.FC = () => {
  const { status, reconnectAttempts, reconnect } = useWebSocket(WS_URL);

  const getColor = () => {
    switch (status) {
      case 'connected':
        return 'green';
      case 'connecting':
        return 'orange';
      case 'reconnecting':
        return 'orange';
      case 'disconnected':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="connection-status" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: getColor()
        }}
      />
      <span style={{ textTransform: 'capitalize' }}>{status}</span>
      {status !== 'connected' && (
        <button onClick={reconnect} style={{ marginLeft: '0.5rem' }}>
          Retry ({reconnectAttempts})
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;
