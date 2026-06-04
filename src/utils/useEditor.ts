{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const socket = io();
    socket.on('content', (content) => {
      setContent(content);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateContent = (content) => {
    socket.emit('content', content);
  };

  return { content, updateContent };
};

export default useEditor;