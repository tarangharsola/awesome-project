{"import { useState, useEffect } from 'react';

interface WebSocketProps {
  username: string;
}

const useWebSocket = ({ username }: WebSocketProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    // implement WebSocket logic here
  }, []);

  return { sendText: (newText: string) => setText(newText) };
}

export default useWebSocket;