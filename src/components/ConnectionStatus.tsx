import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import styles from '../styles/user.module.css';

interface ConnectionStatusProps {
  url: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ url }) => {
  const { isConnected } = useWebSocket({ url });

  return (
    <div className={styles.connectionStatus}>
      <span className={isConnected ? styles.connected : styles.disconnected}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
};
