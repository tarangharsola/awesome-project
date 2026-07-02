{"import { useState, useEffect } from 'react';

interface Props {
  userId: string;
}

const useCursor = ({ userId }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  const [name, setName] = useState('');

  useEffect(() => {
    const handleReceive = (data) => {
      if (data.type === 'cursor') {
        setCursor(data.cursor);
      }
    };
    return () => {
      // cleanup
    };
  }, []);

  return { color, name, cursor };
};

export default useCursor;