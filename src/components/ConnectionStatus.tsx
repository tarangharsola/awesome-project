// src/components/ConnectionStatus.tsx
import React from 'react';
import './ConnectionStatus.css';

type Props = {
  connected: boolean;
};

export const ConnectionStatus: React.FC<Props> = ({ connected }) => {
  return (
    <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
      {connected ? '🟢 Connected' : '🔴 Disconnected – reconnecting...'}
    </div>
  );
};
