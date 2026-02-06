{"import { useState, useEffect } from 'react';

interface useUsersProps {
  roomId: string;
}

const useUsers = ({ roomId }: useUsersProps) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from server
  }, []);

  return users;
};

export default useUsers;