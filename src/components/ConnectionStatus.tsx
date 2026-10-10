import React from 'react';
import './ConnectionStatus.css';

type Props = {
  status: 'connected' | 'disconnected' | 'reconnecting';
};

/**
 * Visual indicator of the WebSocket connection status.
 * Shows different text and CSS classes based on the current state.
 */
export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  let text = '';
  let className = 'connection-status';

  switch (status) {
    case 'connected':
      text = 'Connected';
      className += ' connected';
      break;
    case 'reconnecting':
      text = 'Reconnecting...';
      className += ' reconnecting';
      break;
    case 'disconnected':
    default:
      text = 'Disconnected';
      className += ' disconnected';
      break;
  }

  return <div className={className}>{text}</div>;
};

export default ConnectionStatus;
