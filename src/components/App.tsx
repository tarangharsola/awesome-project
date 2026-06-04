{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { reconnect, isReconnecting } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isReconnecting) {
        setConnectionStatus('reconnecting');
      } else if (connectionStatus === 'reconnecting') {
        setConnectionStatus('connected');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isReconnecting, connectionStatus]);

  return (
    <div>
      <h1>Connection Status: {connectionStatus}</h1>
      <button onClick={reconnect}>Reconnect</button>
    </div>
  );
}
export default App;