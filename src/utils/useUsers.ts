{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  onUsersUpdate: (users: { id: string; name: string; color: string }[]) => void;
}

const useUsers = ({ onUsersUpdate }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const usersUpdate = JSON.parse(event.data);
      setUsers(usersUpdate);
      onUsersUpdate(usersUpdate);
    };

    return () => {
      ws.close();
    };
  }, []);

  return users;
};

export default useUsers;