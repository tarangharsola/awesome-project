{"import { useState, useEffect } from 'react';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState({});

  useEffect(() => {
    // Update users and cursor on changes
  }, []);

  return {
    users,
    cursor,
  };
};

export default useAwareness;