{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  roomId: string;
}

const useCursor = ({ roomId }: Props) => {
  const { users } = useWebSocket(roomId);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorColor, setCursorColor] = useState('#000000');

  useEffect(() => {
    const handleUserUpdate = (user: any) => {
      if (user.cursorPosition !== undefined) {
        setCursorPosition(user.cursorPosition);
      }
      if (user.cursorColor !== undefined) {
        setCursorColor(user.cursorColor);
      }
    };
    users.forEach(handleUserUpdate);
  }, [users]);

  return {
    cursorPosition,
    cursorColor,
  };
};

export default useCursor;