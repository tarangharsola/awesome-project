{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Room {
  id: string;
}

interface WebSocketState {
  ws: WebSocket | null;
  code: string;
}

const useWebSocket = (roomId: string) => {
  const [wsState, setWsState] = useState<WebSocketState>({ ws: null, code: '' });

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);
    setWsState({ ws, code: '' });

    ws.onmessage = (event) => {
      setWsState((prevState) => ({ ...prevState, code: event.data }));
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendCode = (newCode: string) => {
    wsState.ws.send(newCode);
  };

  const receiveCode = (callback: (code: string) => void) => {
    wsState.ws.onmessage = (event) => callback(event.data);
  };

  return { sendCode, receiveCode };
};

export default useWebSocket;