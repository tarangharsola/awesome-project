{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const { sendOperation } = useWebSocket();

  useEffect(() => {
    const handleOperation = (operation) => {
      if (operation.type === 'join') {
        setUsers((prev) => [...prev, { id: operation.data.id, color: operation.data.color }]);
      } else if (operation.type === 'leave') {
        setUsers((prev) => prev.filter((user) => user.id !== operation.data.id));
      }
    };

    sendOperation({ type: 'listen', data: { handleOperation } });
  }, []);

  return {
    users,
  };
};

export default useAwareness;