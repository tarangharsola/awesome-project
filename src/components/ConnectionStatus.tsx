import React from 'react';
import './ConnectionStatus.css';

type Props = {
  status: 'connected' | 'disconnected' | 'reconnecting';
};

/**
 * Visual indicator of the WebSocket connection state.
 * Green  – connected
 * Orange – reconnecting
 * Gray   – disconnected
 */
export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  let color = '#888';
  let text = 'Disconnected';

  if (status === 'connected') {
    color = '#4caf50';
    text = 'Connected';
  } else if (status === 'reconnecting') {
    color = '#ff9800';
    text = 'Reconnecting...';
  }

  return (
    <div className="connection-status" style={{ color, fontSize: '0.9rem', margin: '4px' }}>
      {text}
    </div>
  );
};