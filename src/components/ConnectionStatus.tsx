import React from 'react';
import './ConnectionStatus.css';

type Props = {
  status: 'connected' | 'connecting' | 'disconnected';
};

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  let text = '';
  let className = 'connection-status';

  switch (status) {
    case 'connected':
      text = 'Connected';
      className += ' connected';
      break;
    case 'connecting':
      text = 'Connecting...';
      className += ' connecting';
      break;
    case 'disconnected':
      text = 'Disconnected. Reconnecting...';
      className += ' disconnected';
      break;
    default:
      text = 'Unknown';
  }

  return <div className={className}>{text}</div>;
};