{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('editorUpdate', (data) => {
      setEditorContent(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return editorContent;
};

export default useEditor;