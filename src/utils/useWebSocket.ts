{"import { useState, useEffect } from 'react';
import { editorReducer } from '../store/editorReducer';
import { userReducer } from '../store/userReducer';

function useWebSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  return socket;
}

export default useWebSocket;