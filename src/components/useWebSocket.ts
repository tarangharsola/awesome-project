import { useState, useEffect } from 'react';

interface useWebSocketProps {
  webSocket: any;
}

const useWebSocket = ({ webSocket }: useWebSocketProps) => {
  const [send, setSend] = useState(() => () => {});
  const [receive, setReceive] = useState(() => () => {});

  useEffect(() => {
    const handleSendMessage = (message: any) => {
      setSend(() => () => webSocket.send(message));
    };

    const handleReceiveMessage = (message: any) => {
      setReceive(() => () => webSocket.onmessage(message));
    };

    webSocket.onmessage = handleReceiveMessage;
    return () => {
      webSocket.onmessage = null;
    };
  }, [webSocket]);

  return { send, receive };
};

export default useWebSocket;