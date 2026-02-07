{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  ws: any;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ ws }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        clearInterval(interval);
        setReconnecting(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ws]);

  return (
    <div>
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
};

export default ReconnectionHandler;