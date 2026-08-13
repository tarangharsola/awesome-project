{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface UsersProps {
  userId: string;
}

const useUsers = ({ userId }: UsersProps) => {
  const { messages } = useWebSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const userMessages = messages.filter((message) => message.type === 'userPresence');
      setUsers(userMessages.reduce((acc, message) => {
        acc[message.data.userId] = message.data.userName;
        return acc;
      }, {}));
    }, 100);
    return () => clearInterval(intervalId);
  }, [messages, userId]);

  return { users };
};

export default useUsers;