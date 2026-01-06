{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (readyState === 1) {
      setConnectionStatus('connected');
    } else if (readyState === 3) {
      setConnectionStatus('reconnecting');
    } else {
      setConnectionStatus('disconnected');
    }
  }, [readyState]);

  const retryConnection = () => {
    sendJsonMessage({ type: 'retry' });
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retryConnection}>Retry Connection</button>
    </div>
  );
};
export default ReconnectionHandler;