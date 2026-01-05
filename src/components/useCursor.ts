{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useCursor = () => {
  const { editorState } = useEditor();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // Update cursor position based on editor state
  }, [editorState]);
  return { cursorPosition, userColor };
};

export default useCursor;