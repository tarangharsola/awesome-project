import React from 'react';
import './ConnectionStatus.css';

interface Props {
  connected: boolean;
  attempt: number;
}

/**
 * Visual indicator of WebSocket connection status. Shows a reconnection
 * attempt counter when offline.
 */
export const ConnectionStatus: React.FC<Props> = ({ connected, attempt }) => {
  return (
    <div className={`connection-status ${connected ? 'online' : 'offline'}`}>
      {connected ? 'Connected' : `Reconnecting... (${attempt})`}
    </div>
  );
};
