import React from 'react';
import { useReconnection } from '../hooks/useReconnection';

interface Props {
  wsUrl: string;
}

export const ConnectionStatus: React.FC<Props> = ({ wsUrl }) => {
  const { connected } = useReconnection(wsUrl, () => {});

  return (
    <div className="connection-status" style={{
      position: 'absolute',
      top: 10,
      right: 10,
      padding: '4px 8px',
      background: connected ? 'rgba(0,128,0,0.6)' : 'rgba(128,0,0,0.6)',
      color: '#fff',
      borderRadius: 4,
      fontSize: 12,
    }}>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
};
