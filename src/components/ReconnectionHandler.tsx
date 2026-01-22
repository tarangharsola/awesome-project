{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { sendMessage, lastMessage, sendJsonMessage } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastMessage === null) {
        setConnectionStatus('disconnected');
      } else {
        setConnectionStatus('connected');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [lastMessage]);

  const retryConnection = () => {
    setConnectionStatus('connecting');
    sendMessage({ type: 'retry' });
  };

  const backoff = (attempt) => {
    const delay = Math.pow(2, attempt) * 1000;
    setTimeout(() => {
      retryConnection();
    }, delay);
  };

  useEffect(() => {
    let attempt = 0;
    const intervalId = setInterval(() => {
      backoff(attempt++);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retryConnection}>Retry Connection</button>
    </div>
  );
};
export default ReconnectionHandler;