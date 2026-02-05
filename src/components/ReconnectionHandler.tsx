{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const { reconnect, error: webSocketError } = useWebSocket();

  useEffect(() => {
    if (webSocketError) {
      setError(webSocketError);
      setReconnecting(false);
    }
  }, [webSocketError]);

  if (reconnecting) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p>Reconnecting...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return children;
};

export default ReconnectionHandler;