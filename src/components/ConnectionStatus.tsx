import React from 'react';
import { ConnectionStatus } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

interface Props {
  status: ConnectionStatus;
}

/**
 * Visual indicator of the WebSocket connection status.
 * Shows a colored dot and text:
 *   - green  : connected
 *   - yellow : connecting
 *   - red    : disconnected or error
 */
export const ConnectionStatusIndicator: React.FC<Props> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'connected':
        return '#4caf50'; // green
      case 'connecting':
        return '#ffeb3b'; // yellow
      case 'disconnected':
      case 'error':
        return '#f44336'; // red
      default:
        return '#9e9e9e'; // grey fallback
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const color = getColor();
  const label = getLabel();

  return (
    <div className="connection-status" title={label}>
      <span
        className="status-dot"
        style={{ backgroundColor: color }}
        aria-label={label}
      />
      <span className="status-text">{label}</span>
    </div>
  );
};
