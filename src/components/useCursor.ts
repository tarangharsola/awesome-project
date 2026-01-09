{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface UseCursorProps {
  editor: any;
}

const useCursor = ({ editor }: UseCursorProps) => {
  const [cursor, setCursor] = useState({ position: 0, name: '' });
  useEffect(() => {
    const interval = setInterval(() => {
      const newCursor = editor.getCursor();
      setCursor(newCursor);
    }, 100);
    return () => clearInterval(interval);
  }, [editor]);
  return cursor;
};

export default useCursor;