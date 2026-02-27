{"import { useState, useEffect } from 'react';

interface Props {
  documentId: string;
}

const useAwareness = ({ documentId }) => {
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
    };

    return () => {
      // handle cleanup
    };
  }, []);

  return { users, cursor };
}

export default useAwareness;