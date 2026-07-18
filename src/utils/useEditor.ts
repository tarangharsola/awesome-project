{"import { useState, useEffect } from 'react';
import { editorReducer } from './editorReducer';

const useEditor = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateCode') {
        setCode(data.code);
      }
    };
    return () => ws.close();
  }, []);

  return code;
};

export default useEditor;