{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function useEditor() {
  const [editorValue, setEditorValue] = useState('');
  const ws = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'editorValue') {
        setEditorValue(data.editorValue);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return editorValue;
}

export default useEditor;