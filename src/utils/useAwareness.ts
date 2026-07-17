{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const editor = useEditor();

  useEffect(() => {
    const handleCursorMove = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.id]: cursor }));
    };

    editor.on('cursorMove', handleCursorMove);

    return () => editor.off('cursorMove', handleCursorMove);
  }, [editor]);

  return awareness;
};

export default useAwareness;