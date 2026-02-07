{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useEditor = () => {
  const [editor, setEditor] = useState('');
  const { send, receive } = useWebSocket();

  useEffect(() => {
    const handleUpdate = (data) => {
      setEditor(data.editor);
    };

    receive(handleUpdate);
    return () => {
      receive(null);
    };
  }, []);

  const updateLanguage = (language) => {
    send({ type: 'UPDATE_LANGUAGE', language });
  };

  return { editor, updateLanguage };
};

export default useEditor;