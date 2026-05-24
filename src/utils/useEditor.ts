{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useEditor = () => {
  const [editorState, setEditorState] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    socket.on('editorState', (data) => {
      setEditorState(data);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return { editorState, connected };
};

export default useEditor;