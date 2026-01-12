{"import { useState, useEffect } from 'react';

interface useCursorProps {
  editor: any;
}

const useCursor = ({ editor }: useCursorProps) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, color: '' });

  useEffect(() => {
    const handleCursorUpdate = (cursor: any) => {
      setCursor(cursor);
    };

    editor.subscribe('UPDATE_CURSOR', handleCursorUpdate);

    return () => {
      editor.unsubscribe('UPDATE_CURSOR', handleCursorUpdate);
    };
  }, [editor]);

  return cursor;
};

export default useCursor;