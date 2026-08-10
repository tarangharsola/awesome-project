{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  roomId: string;
}

const useWebSocket = ({ roomId }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [cursors, setCursors] = useState<{ [userId: string]: [number, number] }>({});
  const [users, setUsers] = useState<{ [userId: string]: { color: string } }>({});

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);
    setWs(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'code') {
        setCode(data.code);
      } else if (data.type === 'cursor') {
        setCursors((prevCursors) => ({ ...prevCursors, [data.userId]: data.position }));
      } else if (data.type === 'user') {
        setUsers((prevUsers) => ({ ...prevUsers, [data.userId]: { color: data.color } }));
      }
   );

    return () => {
      ws.close();
    };
  }, []);

  const sendCode = (code: string) => {
    ws.send(JSON.stringify({ type: 'code', code }));
  };

  return { sendCode, cursors, users };
}

export default useWebSocket;