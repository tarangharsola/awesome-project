{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface WebSocketState {
  connected: boolean;
}

const useWebSocket = () => {
  const [webSocketState, setWebSocketState] = useState<WebSocketState>({ connected: false });
  const socket = io();

  useEffect(() => {
    socket.on('connect', () => {
      setWebSocketState({ connected: true });
    });
    socket.on('disconnect', () => {
      setWebSocketState({ connected: false });
    });
  }, []);

  return webSocketState;
};

export default useWebSocket;