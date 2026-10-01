import React from 'react';
import { useWebSocket } from '../hooks';
import './ConnectionStatus.css';

interface Props {
  url: string;
}

export const ConnectionStatus: React.FC<Props> = ({ url }) => {
  const { connected } = useWebSocket({ url });

  return (
    <div className={`connection-status ${connected ? 'online' : 'offline'}`}>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
};