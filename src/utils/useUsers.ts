{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  users: { id: string; name: string; color: string }[]
}

const useUsers = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState(users);
  const { connection } = useWebSocket();

  useEffect(() => {
    if (connection) {
      connection.onmessage = (event) => {
        const { userId, color } = JSON.parse(event.data);
        setActiveUsers((prevUsers) => {
          const userIndex = prevUsers.findIndex((user) => user.id === userId);
          if (userIndex !== -1) {
            prevUsers[userIndex].color = color;
          }
          return prevUsers;
        });
      };
    }
  }, [connection]);

  return { activeUsers };
}

export default useUsers;