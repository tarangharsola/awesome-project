{"import { useState, useEffect } from 'react';

interface useCursorProps {
  editor: useEditor;
}

const useCursor = ({ editor }: useCursorProps) => {
  const { operations } = editor;
  const [cursor, setCursor] = useState(null);
  useEffect(() => {
    const cursor = operations.find((op) => op.type === 'insert' && op.position === operations[0].position);
    setCursor(cursor);
  }, [operations]);
  return cursor;
};

export default useCursor;