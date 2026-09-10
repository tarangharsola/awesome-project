import React from 'react';
import './ConnectionStatus.css';
import { useWebSocket } from '../hooks/useWebSocket';

/**
 * Visual indicator of the WebSocket connection state.
 * Shows different messages for connected, connecting, and disconnected states.
 * Provides a retry button when disconnected.
 */
const ConnectionStatus: React.FC = () => {
  // The WebSocket URL is expected to be provided via an environment variable.
  const wsUrl = process.env.REACT_APP_WS_URL || '';
  const { status, manualRetry } = useWebSocket(wsUrl, () => {});

  return (
    <div className={`connection-status ${status}`}>
      {status === 'connected' && (
        <span className="status-indicator connected">✅ Connected</span>
      )}
      {status === 'connecting' && (
        <span className="status-indicator connecting">⏳ Connecting...</span>
      )}
      {status === 'disconnected' && (
        <span className="status-indicator disconnected">
          ❌ Disconnected
          <button className="retry-button" onClick={manualRetry}>
            Retry
          </button>
        </span>
      )}
    </div>
  );
};

export default ConnectionStatus;
