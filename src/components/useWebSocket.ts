{"import { useState, useEffect } from 'react';

interface Props {
  documentId: string;
}

const useWebSocket = ({ documentId }) => {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // implement WebSocket logic here
  }, []);

  return { sendText: (text) => setText(text), receiveText: (text) => setText(text) };
}

export default useWebSocket;