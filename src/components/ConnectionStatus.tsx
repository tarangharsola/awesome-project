import React from 'react';
import { useWebSocket } from '../utils/hooks/useWebSocket';
import styles from '../styles/user.module.css';

export const ConnectionStatus: React.FC = () => {
  const { status, retryIn } = useWebSocket();

  let text: string;
  let className = styles.status;

  switch (status) {
    case 'connected':
      text = 'Connected';
      className += ` ${styles.connected}`;
      break;
    case 'connecting':
      text = 'Connecting...';
      className += ` ${styles.connecting}`;
      break;
    default:
      text = retryIn ? `Reconnecting in ${retryIn}s` : 'Disconnected';
      className += ` ${styles.disconnected}`;
  }

  return <div className={className}>{text}</div>;
};