{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function useEditor() {
  const ws = useWebSocket('ws://localhost:8080');
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'editorValue') {
        setEditorValue(data.editorValue);
      }
    };
  }, []);

  return editorValue;
}

export default useEditor;