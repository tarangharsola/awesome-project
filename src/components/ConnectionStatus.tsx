import React from 'react';
import { useWebSocket } from '../utils/hooks/useWebSocket';

interface Props {
  url: string;
  username: string;
}

export const ConnectionStatus: React.FC<Props> = ({ url, username }) => {
  // We only need connection state; other callbacks are no‑ops here.
  const { connected } = useWebSocket(url, username, () => {}, () => {});

  return (
    <div className={`connection-status ${connected ? 'online' : 'offline'}`}>
      {connected ? 'Connected' : 'Disconnected – attempting reconnection...'}
    </div>
  );
};
