{"import { useState, useEffect } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Update users on changes
  }, []);

  return {
    users,
  };
};

export default useUsers;