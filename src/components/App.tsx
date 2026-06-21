{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { connect, disconnect } = useWebSocket();

  useEffect(() => {
    connect(() => {
      setConnectionStatus('connected');
    }, () => {
      setConnectionStatus('disconnected');
    });
    return disconnect;
  }, []);

  return (
    <div>
      <h1>Connection Status: {connectionStatus}</h1>
      <button onClick={() => connect()}>Retry Connection</button>
    </div>
  );
};
export default App;