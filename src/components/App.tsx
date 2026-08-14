{"import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  return (
    <div>
      <h1>Connection Status: {connected ? 'Connected' : 'Disconnected'}</h1>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};
export default App;