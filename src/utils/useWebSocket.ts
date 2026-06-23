{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  roomId: string;
}

const useWebSocket = ({ roomId }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);
    setWs(ws);

    ws.onmessage = (event) => {
      const operation = JSON.parse(event.data);
      switch (operation.type) {
        case 'UPDATE_CODE':
          setCode(operation.code);
          break;
        case 'JOIN':
          setUsers((prevUsers) => [...prevUsers, operation.user]);
          break;
        case 'LEAVE':
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== operation.userId));
          break;
        default:
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    ws,
    users,
    sendOperation: (operation: any) => {
      if (ws !== null) {
        ws.send(JSON.stringify(operation));
      }
    },
  };
};

export default useWebSocket;