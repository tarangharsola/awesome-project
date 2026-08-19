import React from 'react';
import styles from '../styles/user.module.css';

interface Props {
  connected: boolean;
}

export const ConnectionStatus: React.FC<Props> = ({ connected }) => {
  return (
    <div className={styles.connectionStatus}>
      <span
        className={connected ? styles.online : styles.offline}
        title={connected ? 'Connected' : 'Disconnected'}
      >
        ●
      </span>
      <span className={styles.label}>{connected ? 'Online' : 'Offline'}</span>
    </div>
  );
};