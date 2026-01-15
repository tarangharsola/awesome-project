{"import { useState, useEffect } from 'react';

interface useCursorProps {
  editor: useEditor;
}

const useCursor = ({ editor }) => {
  const [cursor, setCursor] = useState([]);
  useEffect(() => {
    const handleCursorChange = () => {
      setCursor(editor.getCursor());
    };
    editor.on('cursorChange', handleCursorChange);
    return () => editor.off('cursorChange', handleCursorChange);
  }, [editor]);
  return cursor;
};

export default useCursor;