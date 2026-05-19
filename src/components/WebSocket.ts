{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const [backoffTimeout, setBackoffTimeout] = useState(null);

  const { send, close } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        setBackoffTimeout(setTimeout(() => {
          send({
            type: 'ping'
          });
        }, Math.pow(2, retryCount) * 1000));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount, send]);

  useEffect(() => {
    if (connectionStatus === 'connected') {
      setRetryCount(0);
      setBackoffTimeout(null);
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (backoffTimeout) {
      clearTimeout(backoffTimeout);
    }
  }, [backoffTimeout]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
      <button onClick={() => close()}>Disconnect</button>
    </div>
  );
};
export default WebSocket;