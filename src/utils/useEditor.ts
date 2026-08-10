{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  roomId: string;
  initialCode: string;
}

const useEditor = ({ roomId, initialCode }: Props) => {
  const [code, setCode] = useState(initialCode);
  const { sendCode, cursors, users } = useWebSocket(roomId);

  useEffect(() => {
    sendCode(code);
  }, [code]);

  return { sendCode, cursors, users };
}

export default useEditor;