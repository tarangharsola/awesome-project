{"import { useState, useEffect } from 'react';

interface Awareness {
  users: any[];
  cursors: any[];
}

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    const handleCursorUpdate = (cursor) => {
      setCursors((prevCursors) => [...prevCursors, cursor]);
    };

    return () => {
      // cleanup
    };
  }, []);

  return {
    users,
    cursors,
    handleUserJoin,
    handleUserLeave,
    handleCursorUpdate
  };
}

export default useAwareness;