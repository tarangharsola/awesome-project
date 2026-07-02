{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface Awareness {
  updateAwareness: (users: { id: string; name: string }[]) => void;
}

const useAwareness = () => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const updateAwareness = (users: { id: string; name: string }[]) => {
      setUsers(users);
    };
    ws?.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateAwareness(data.users);
    };
  }, [ws, users]);

  return { updateAwareness, users };
};
export default useAwareness;