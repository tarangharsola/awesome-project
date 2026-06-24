{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { reconnect, connectionStatus: wsStatus } = useWebSocket();

  useEffect(() => {
    setConnectionStatus(wsStatus);
  }, [wsStatus]);

  const retry = () => {
    reconnect();
  };

  return (
    <div>
      <h1>Connection Status: {connectionStatus}</h1>
      <button onClick={retry}>Retry</button>
    </div>
  );
}

export default App;