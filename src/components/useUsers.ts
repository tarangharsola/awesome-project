{"import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  color: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from storage or API
  }, []);

  return {
    users,
  };
}

export default useUsers;