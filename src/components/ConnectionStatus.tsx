import React from 'react';
import './ConnectionStatus.css';

type ConnectionStatusProps = {
  status: 'connected' | 'disconnected' | 'connecting';
};

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  let text = '';
  let className = '';

  switch (status) {
    case 'connected':
      text = 'Connected';
      className = 'connected';
      break;
    case 'connecting':
      text = 'Connecting...';
      className = 'connecting';
      break;
    default:
      text = 'Disconnected';
      className = 'disconnected';
  }

  return <div className={`connection-status ${className}`}>{text}</div>;
};