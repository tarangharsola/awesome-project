{"import { useState, useEffect } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch users from API here
    setUsers([...users, { id: 1, name: 'John Doe' }]);
  }, []);
  return users;
}

export default useUsers;