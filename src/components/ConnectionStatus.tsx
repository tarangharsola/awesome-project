import React from 'react';
import './ConnectionStatus.css';
import { ConnectionStatus } from '../hooks/useWebSocket';

type Props = {
  status: ConnectionStatus;
};

/**
 * Visual indicator of the WebSocket connection state.
 * Shows a colored dot and a textual label.
 */
export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const getClass = () => `connection-status ${status}`;

  return (
    <div className={getClass()}>
      <span className="dot" />
      <span className="label">{getLabel()}</span>
    </div>
  );
};