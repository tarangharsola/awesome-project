{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useEditor() {
  const [code, setCode] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'code') {
        setCode(data.code);
      }
    };
    return () => ws.close();
  }, []);

  return code;
}

export default useEditor;