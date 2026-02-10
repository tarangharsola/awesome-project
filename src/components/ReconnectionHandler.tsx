{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function ReconnectionHandler() {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { reconnect, connectionStatus: wsStatus } = useWebSocket();

  useEffect(() => {
    if (wsStatus === 'closed') {
      setConnectionStatus('disconnected');
      reconnect();
    } else if (wsStatus === 'connecting') {
      setConnectionStatus('connecting');
    } else {
      setConnectionStatus('connected');
    }
  }, [wsStatus, reconnect]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={reconnect}>Retry</button>
    </div>
  );
}
export default ReconnectionHandler;