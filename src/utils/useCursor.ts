{"import { useState, useEffect } from 'react';

interface Props {
  users: { id: string; name: string; color: string }[];
}

const useCursor = ({ users }: Props) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const user = users.find((user) => user.id === 'current');
      if (user) {
        setCursor({ x: user.x, y: user.y });
        setColor(user.color);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [users]);

  return { cursor, color };
}

export default useCursor;