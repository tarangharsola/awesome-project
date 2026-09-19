import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

type Props = {
  roomId: string;
};

export const ConnectionStatus: React.FC<Props> = ({ roomId }) => {
  const { connectionStatus, manualRetry } = useWebSocket(roomId);

  const getColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'green';
      case 'connecting':
        return 'orange';
      default:
        return 'red';
    }
  };

  return (
    <div className="connection-status" onClick={manualRetry} title="Click to retry">
      <span className="status-indicator" style={{ backgroundColor: getColor() }} />
      <span className="status-text">{connectionStatus}</span>
    </div>
  );
};