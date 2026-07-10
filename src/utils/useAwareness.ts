{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const { users, dispatch } = useUsers();
  const { editorState } = useEditor();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('update', handleUserUpdate);

    return () => {
      users.off('update', handleUserUpdate);
    };
  }, [users, dispatch, editorState]);

  return awareness;
};

export default useAwareness;