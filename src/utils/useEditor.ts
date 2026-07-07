{"import { useState, useEffect } from 'react';
import { editorReducer } from '../store/editorReducer';

function useEditor() {
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'editorUpdate') {
        setEditorValue(data.editorValue);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return editorValue;
}

export default useEditor;