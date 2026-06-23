{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  roomId: string;
  initialCode: string;
}

const useEditor = ({ roomId, initialCode }: Props) => {
  const [code, setCode] = useState(initialCode);
  const { sendOperation } = useWebSocket(roomId);

  useEffect(() => {
    const handleCodeChange = (newCode: string) => {
      setCode(newCode);
    };
    sendOperation({ type: 'UPDATE_CODE', code: newCode });
  }, [code, sendOperation]);

  return {
    code,
    sendOperation,
  };
};

export default useEditor;