import React from 'react';
import './ConnectionStatus.css';

interface Props {
  status: 'connected' | 'disconnected' | 'reconnecting';
  attempts?: number;
}

export const ConnectionStatus: React.FC<Props> = ({ status, attempts = 0 }) => {
  let text = '';
  let className = 'connection-status';
  switch (status) {
    case 'connected':
      text = 'Connected';
      className += ' connected';
      break;
    case 'reconnecting':
      text = `Reconnecting (attempt ${attempts})`;
      className += ' reconnecting';
      break;
    case 'disconnected':
      text = 'Disconnected';
      className += ' disconnected';
      break;
  }
  return <div className={className}>{text}</div>;
};
