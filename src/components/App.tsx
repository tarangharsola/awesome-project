{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { reconnect, status } = useWebSocket();

  useEffect(() => {
    setConnectionStatus(status);
  }, [status]);

  const handleReconnect = () => {
    reconnect();
  };

  return (
    <div>
      <h1>Connection Status: {connectionStatus}</h1>
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
}
export default App;