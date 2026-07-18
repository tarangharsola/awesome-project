{"import { useState, useEffect } from 'react';
import { editorReducer } from './editorReducer';

const useConflictResolver = () => {
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'conflict') {
        setConflict(true);
      } else if (data.type === 'resolved') {
        setConflict(false);
      }
    };
    return () => ws.close();
  }, []);

  return conflict;
};

export default useConflictResolver;