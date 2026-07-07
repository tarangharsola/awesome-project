{"import { useState, useEffect } from 'react';
import { userReducer } from '../store/userReducer';

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userJoin') {
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else if (data.type === 'userLeave') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data.userId));
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return users;
}

export default useUsers;