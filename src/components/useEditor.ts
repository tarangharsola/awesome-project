{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useEditor = () => {
  const [document, setDocument] = useState('');
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('document', (data) => setDocument(data));
  }, []);

  return { document, updateDocument: (document) => send('document', document) };
};

export default useEditor;