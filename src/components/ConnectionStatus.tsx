import React from 'react';
import { useWebSocket, WebSocketStatus } from '../hooks/useWebSocket';

// Default WebSocket URL – can be overridden via an env variable.
const DEFAULT_WS_URL =
  process.env.REACT_APP_WS_URL ||
  `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`;

/**
 * Visual indicator of the WebSocket connection state.
 * Shows a colored dot, a textual status, and a retry button when not connected.
 */
export const ConnectionStatus: React.FC = () => {
  const { status, reconnect } = useWebSocket({ url: DEFAULT_WS_URL });

  const getColor = (s: WebSocketStatus): string => {
    switch (s) {
      case 'connected':
        return '#4caf50'; // green
      case 'reconnecting':
        return '#ff9800'; // orange
      case 'disconnected':
        return '#f44336'; // red
      default:
        return '#9e9e9e'; // grey for 'connecting'
    }
  };

  const capitalized = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span
        style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: getColor(status),
        }}
        aria-label={`connection-${status}`}
      />
      <span>{capitalized(status)}</span>
      {status !== 'connected' && (
        <button onClick={reconnect} style={{ marginLeft: '0.5rem' }}>
          Retry
        </button>
      )}
    </div>
  );
};
