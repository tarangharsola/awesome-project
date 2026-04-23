{"import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('');

  useEffect(() => {
    WebSocket.connect();
    return () => WebSocket.disconnect();
  }, []);

  return { connected, users, code };
}

export default useWebSocket;