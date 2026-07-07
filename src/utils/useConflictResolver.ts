{"import { useState, useEffect } from 'react';
import { editorReducer } from '../store/editorReducer';

function useConflictResolver() {
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'conflict') {
        setConflict(true);
      } else if (data.type === 'resolved') {
        setConflict(false);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return conflict;
}

export default useConflictResolver;