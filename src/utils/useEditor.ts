{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  roomId: string;
}

const useEditor = (roomId: string) => {
  const [code, setCode] = useState('');
  const { sendCode, receiveCode } = useWebSocket(roomId);
  return { sendCode, receiveCode, code };
};

export default useEditor;