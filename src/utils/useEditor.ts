{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useEditor = () => {
  const { users } = useWebSocket();
  const [code, setCode] = useState('');

  useEffect(() => {
    const handleChanges = (changes) => {
      setCode(changes.code);
    };
    users.on('changes', handleChanges);
    return () => users.off('changes', handleChanges);
  }, [users]);

  return { editor, users };
};

export default useEditor;