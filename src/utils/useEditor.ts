{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useEditor = () => {
  const [editorState, setEditorState] = useState({});
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive((message) => {
      setEditorState(message);
    });
  }, []);

  return { editorState, send };
};

export default useEditor;