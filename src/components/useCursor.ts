{"import { useState, useEffect } from 'react';

interface useCursorProps {
  editor: any;
  user: any;
}

const useCursor = ({ editor, user }: useCursorProps) => {
  const [cursor, setCursor] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    const handleCursorChange = (newCursor: any) => {
      setCursor(newCursor);
    };

    const handleSelectionChange = (newSelection: any) => {
      setSelection(newSelection);
    };

    return () => {
      editor.off('cursorChange', handleCursorChange);
      editor.off('selectionChange', handleSelectionChange);
    };
  }, []);

  return { cursor, selection };
}

export default useCursor;