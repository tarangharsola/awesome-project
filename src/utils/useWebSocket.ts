{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
}

const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [send, setSend] = useState<((data: any) => void) | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    setSend((data) => {
      ws.send(JSON.stringify(data));
    });

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'UPDATE_CURSOR':
            setWs((prevWs) => {
              if (prevWs) {
                prevWs.send(JSON.stringify({
                  type: 'UPDATE_CURSOR',
                  data: {
                    userId: data.data.userId,
                    position: data.data.position,
                  },
                }));
              }
              return prevWs;
            });
            break;
          case 'UPDATE_USER':
            setWs((prevWs) => {
              if (prevWs) {
                prevWs.send(JSON.stringify({
                  type: 'UPDATE_USER',
                  data: {
                    id: data.data.id,
                    name: data.data.name,
                    color: data.data.color,
                  },
                }));
              }
              return prevWs;
            });
            break;
        }
      });
    }
  }, [ws]);

  return { send, receive: (handleUpdate: (data: any) => void) => {
    if (ws) {
      ws.onmessage = (event) => {
        handleUpdate(JSON.parse(event.data));
      };
    }
  } };
}

export default useWebSocket;