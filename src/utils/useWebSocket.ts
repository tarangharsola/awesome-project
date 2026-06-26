{"import { useState, useEffect } from 'react';

interface Props {
  url: string;
}

const useWebSocket = ({ url }: Props) => {
  const [send, setSend] = useState(() => () => {});
  const [receive, setReceive] = useState(() => () => {});

  useEffect(() => {
    const ws = new WebSocket(url);
    setSend((message) => () => ws.send(message));
    setReceive((message) => () => message);
    return () => ws.close();
  }, [url]);

  return { send, receive };
}

export default useWebSocket;