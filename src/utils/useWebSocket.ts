{"import { useState, useEffect } from 'react';

interface Props {
  roomId: string;
}

const useWebSocket = ({ roomId }: Props) => {
  const [connected, setConnected] = useState(false);

  const joinRoom = () => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  };

  const leaveRoom = () => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  };

  return { joinRoom, leaveRoom };
}

export default useWebSocket;