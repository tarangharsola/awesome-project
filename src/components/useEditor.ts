{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useEditor = () => {
  const webSocket = useWebSocket();
  const [editorState, setEditorState] = useState({});

  useEffect(() => {
    webSocket.onMessage((message) => {
      setEditorState(message.editorState);
    });
  }, [webSocket]);

  return { ...editorState, hasConflict: webSocket.hasConflict);
};

export default useEditor;