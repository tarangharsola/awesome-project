import React from 'react';
import styles from '../styles/user.module.css';

type Props = {
  /** Current connection status provided by useWebSocket */
  status: 'connected' | 'connecting' | 'disconnected';
};

/**
 * Visual indicator of WebSocket connection state.
 * Shows a colored dot (green = connected, orange = connecting, red = disconnected)
 * alongside a textual label.
 */
export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'connected':
        return '#4caf50'; // green
      case 'connecting':
        return '#ff9800'; // orange
      case 'disconnected':
        return '#f44336'; // red
      default:
        return '#9e9e9e';
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
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={styles.connectionStatus} style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: getColor(),
          marginRight: 8,
          display: 'inline-block',
        }}
      />
      <span>{getLabel()}</span>
    </div>
  );
};