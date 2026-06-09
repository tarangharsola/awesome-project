{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface Props {
  url: string
}

const useWebSocket = ({ url }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const socket = io(url);
    setConnection(socket);
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return { connection };
}

export default useWebSocket;