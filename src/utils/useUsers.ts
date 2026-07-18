{"import { useState, useEffect } from 'react';
import { userReducer } from './userReducer';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  return users;
};

export default useUsers;