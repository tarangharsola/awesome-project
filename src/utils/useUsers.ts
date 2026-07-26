{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
}

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();

  useEffect(() => {
    const handleUserUpdate = (data: {
      type: 'UPDATE_USER';
      data: {
        id: string;
        name: string;
        color: string;
      };
    }) => {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        const index = updatedUsers.findIndex((user) => user.id === data.data.id);
        if (index !== -1) {
          updatedUsers[index] = data.data;
        } else {
          updatedUsers.push(data.data);
        }
        return updatedUsers;
      });
    };

    receive(handleUserUpdate);

    return () => {
      receive(null);
    };
  }, [receive]);

  return { users };
}

export default useUsers;