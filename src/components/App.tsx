{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const { connect, reconnect, error } = useWebSocket();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (error) {
      setConnectionStatus('Error: ' + error);
    } else if (reconnect) {
      setConnectionStatus('Reconnecting...');
    } else {
      setConnectionStatus('Connected');
    }
  }, [error, reconnect]);

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <p>Connection Status: {connectionStatus}</p>
      <Editor />
    </div>
  );
}

export default App;