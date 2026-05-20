{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('editorUpdate', (data) => {
      setEditorValue(data);
    });
  }, []);

  return { editorValue };
};

export default useEditor;