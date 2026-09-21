import React from 'react';
import './ConnectionStatus.css';

type Props = {
  status: 'connected' | 'disconnected' | 'connecting';
};

const ConnectionStatus: React.FC<Props> = ({ status }) => {
  let text = '';
  let className = 'connection-status';

  if (status === 'connected') {
    text = 'Connected';
    className += ' connected';
  } else if (status === 'connecting') {
    text = 'Connecting...';
    className += ' connecting';
  } else {
    text = 'Disconnected';
    className += ' disconnected';
  }

  return <div className={className}>{text}</div>;
};

export default ConnectionStatus;