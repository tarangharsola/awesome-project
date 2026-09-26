import React from 'react';
import { ConnectionStatus as ConnStatus } from '../types/connection';

interface Props {
  status: ConnStatus;
}

const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const color =
    status === 'connected'
      ? 'green'
      : status === 'connecting'
      ? 'orange'
      : 'red';
  return (
    <div className="connection-status" style={{ color }}>
      {status}
    </div>
  );
};

export default ConnectionStatus;