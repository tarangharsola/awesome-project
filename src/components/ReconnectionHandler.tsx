{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        reconnect();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [reconnecting, reconnect]);

  return (
    <div style={{
      position: 'relative',
    }}>
      {children}
      {reconnecting && <div style={{
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
      </div>}
    </div>
  );
};

export default ReconnectionHandler;