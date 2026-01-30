{"import React, { useState, useEffect } from 'react';
import { WebSocket } from './WebSocket';

interface AwarenessConsistencyProps {
  children: React.ReactNode;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ children }) => {
  const [users, setUsers] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'user-position') {
        setUsers((prevUsers) => ({ ...prevUsers, [data.userId]: data.position }));
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {children}
      <ul>
        {Object.keys(users).map((userId) => (
          <li key={userId}>{userId} ({users[userId].x}, {users[userId].y})</li>
        ))}
      </ul>
    </div>
  );
};

export default AwarenessConsistency;