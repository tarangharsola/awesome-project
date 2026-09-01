import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import styles from '../styles/user.module.css';

/**
 * Simple visual indicator of the WebSocket connection status.
 * Shows green when connected, orange when reconnecting, and red when disconnected.
 */
export const ConnectionStatus: React.FC<{ url: string }> = ({ url }) => {
  const { status } = useWebSocket(url);

  const getColor = () => {
    switch (status) {
      case 'connected':
        return '#4caf50'; // green
      case 'reconnecting':
        return '#ff9800'; // orange
      case 'disconnected':
      default:
        return '#f44336'; // red
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'reconnecting':
        return 'Reconnecting...';
      case 'disconnected':
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className={styles.connectionStatus} style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: getColor(),
          marginRight: '8px',
          transition: 'background-color 0.3s ease',
        }}
      />
      <span>{getLabel()}</span>
    </div>
  );
};
