import React from 'react';
import { WebSocketStatus } from '../types';

interface Props {
  status: WebSocketStatus;
}

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const color = status === 'CONNECTED' ? 'green' : status === 'CONNECTING' ? 'orange' : 'red';
  return (
    <div className="connection-status" style={{ color }}>
      {status}
    </div>
  );
};
