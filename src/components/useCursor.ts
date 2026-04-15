{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useCursor = () => {
  const editor = useEditor();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCursor(editor.getCursorPosition);
  }, [editor.getCursorPosition]);

  return cursor;
};

export default useCursor;