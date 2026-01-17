{"import { useState, useEffect } from 'react';

interface useEditor {
  content: string;
  setContent: (content: string) => void;
  awareness: { name: string; color: string }[];
  conflicts: { message: string }[];
  users: { name: string; color: string }[];
}

const useEditor = () => {
  const [content, setContent] = useState('');
  const [awareness, setAwareness] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleContentUpdate = (content) => {
      setContent(content);
    };

    const handleAwarenessUpdate = (awareness) => {
      setAwareness(awareness);
    };

    const handleConflictUpdate = (conflicts) => {
      setConflicts(conflicts);
    };

    const handleUserUpdate = (users) => {
      setUsers(users);
    };

    return () => {
      // Clean up
    };
  }, []);

  return {
    content,
    setContent,
    awareness,
    conflicts,
    users,
  };
};

export default useEditor;