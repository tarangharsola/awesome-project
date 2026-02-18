{"import { useState, useEffect } from 'react';

interface UsersProps {
}

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // implement user tracking logic here
  }, []);

  return users;
}

export default useUsers;