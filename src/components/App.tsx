{"import React from 'react';
import { useReconnectionHandler } from './useReconnectionHandler';

const App = () => {
  const { reconnect, connectionStatus } = useReconnectionHandler();
  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <button onClick={reconnect}>Reconnect</button>
      <p>Connection Status: {connectionStatus}</p>
    </div>
  );
};

export default App;