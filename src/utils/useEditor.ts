{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [editorState, setEditorState] = useState({});

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('editorState', (state) => {
      setEditorState(state);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateEditorState = (state) => {
    const socket = io('ws://localhost:3001');
    socket.emit('editorState', state);
  };

  return { editorState, updateEditorState };
};

export default useEditor;