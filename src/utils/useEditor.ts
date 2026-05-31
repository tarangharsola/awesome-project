{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [editorState, setEditorState] = useState({
    text: '',
    cursor: null,
  });

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('editorState', (editorState) => {
      setEditorState(editorState);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return editorState;
};

export default useEditor;