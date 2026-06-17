{"import { useState, useEffect } from 'react';

interface Props {
  roomId: string;
}

const useEditor = ({ roomId }: Props) => {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const sendCode = (newCode: string) => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);

    ws.send(JSON.stringify({ type: 'code', data: newCode }));

    ws.onmessage = (event) => {
      if (event.data.type === 'code') {
        setCode(event.data.data);
      }
    };

    return () => {
      ws.close();
    };
  };

  const receiveCode = (newCode: string) => {
    setCode(newCode);
  };

  return { sendCode, receiveCode };
}

export default useEditor;