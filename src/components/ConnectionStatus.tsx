import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

/**
 * Displays the current WebSocket connection status and provides a manual retry button.
 * The hook is expected to be instantiated at a higher level (e.g., App) and passed via context.
 * For simplicity, this component creates its own connection using the same URL as the app.
 */
const CONNECTION_URL = `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws`;

export const ConnectionStatus: React.FC = () => {
  const { status, retryNow, reconnectAttempts } = useWebSocket(CONNECTION_URL);

  const renderMessage = () => {
    switch (status) {
      case 'connected':
        return <span className="status connected">Connected</span>;
      case 'connecting':
        return <span className="status connecting">Connecting…</span>;
      case 'disconnected':
        return (
          <span className="status disconnected">
            Disconnected (attempt {reconnectAttempts})
            <button className="retry-button" onClick={retryNow}>Retry Now</button>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="connection-status-container">
      {renderMessage()}
    </div>
  );
};

export default ConnectionStatus;
