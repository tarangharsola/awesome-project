{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface useCursorProps {
  roomId: string;
}

const useCursor = ({ roomId }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // implement cursor logic here
  }, []);
  return cursor;
};

export default useCursor;