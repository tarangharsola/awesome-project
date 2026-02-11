import React from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  webSocket: any;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ webSocket }) => {
  const { reconnect } = useWebSocket();

  const handleReconnect = () => {
    reconnect();
  };

  return (
    <div>
      <h2>Reconnection Handler</h2>
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
};

export default ReconnectionHandler;