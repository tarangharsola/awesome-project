{"import { useState, useEffect } from 'react';

interface Props {
  userId: string;
}

const useCursor = ({ userId }: Props) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { send } = useWebSocket();

  useEffect(() => {
    send({ type: 'cursor', data: { userId, x: cursor.x, y: cursor.y } });
  }, [cursor]);

  return [cursor, setCursor];
};

export default useCursor;