import React from 'react';
import './ConnectionStatus.css';
import { ConnectionStatus } from '../hooks/useWebSocket';

type Props = {
  status: ConnectionStatus;
};

const ConnectionStatusIndicator: React.FC<Props> = ({ status }) => {
  let label = '';
  let className = 'connection-status';

  switch (status) {
    case 'connected':
      label = 'Connected';
      className += ' connected';
      break;
    case 'connecting':
      label = 'Connecting...';
      className += ' connecting';
      break;
    case 'retrying':
      label = 'Reconnecting...';
      className += ' retrying';
      break;
    case 'disconnected':
    default:
      label = 'Disconnected';
      className += ' disconnected';
      break;
  }

  return <div className={className}>{label}</div>;
};

export default ConnectionStatusIndicator;
