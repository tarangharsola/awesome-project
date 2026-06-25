{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useAwareness() {
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
      if (data.type === 'cursor') {
        setCursor(data.cursor);
      }
    };
    return () => ws.close();
  }, []);

  return [users, cursor];
}

export default useAwareness;