{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface useUsersProps {
  roomId: string;
}

const useUsers = ({ roomId }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // implement users logic here
  }, []);
  return users;
};

export default useUsers;