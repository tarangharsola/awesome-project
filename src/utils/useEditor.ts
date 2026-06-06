{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [editorState, setEditorState] = useState({});

  useEffect(() => {
    const socket = io('ws://localhost:3001');

    socket.on('write', (data) => {
      setEditorState(data);
    });

    socket.on('delete', (data) => {
      setEditorState(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return editorState;
};
export default useEditor;