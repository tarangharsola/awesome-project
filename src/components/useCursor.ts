{"import { useState } from 'react';

interface useCursorProps {
  editor: any;
}

const useCursor = ({ editor }: useCursorProps) => {
  const [cursorPosition, setCursorPosition] = useState(null);

  useEffect(() => {
    const handleCursorChange = (position) => {
      setCursorPosition(position);
    };
    editor.on('cursorChange', handleCursorChange);
    return () => editor.off('cursorChange', handleCursorChange);
  }, [editor]);

  return cursorPosition;
};

export default useCursor;