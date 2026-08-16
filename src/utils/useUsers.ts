import { useState, useEffect } from 'react';

const useUsers = (roomId: string) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Update users here
  }, []);
  return { users, roomId };
};

export default useUsers;