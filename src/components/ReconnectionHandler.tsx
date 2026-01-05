{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (readyState === WebSocket.CLOSED) {
      setConnectionStatus('disconnected');
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        setRetryCount(0);
        setConnectionStatus('reconnecting');
      }, 5000);
    }
  }, [readyState, retryCount]);

  const handleReconnect = () => {
    sendJsonMessage({ type: 'reconnect' });
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
};
export default ReconnectionHandler;