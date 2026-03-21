{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface AwarenessProps {
  editor: useEditor;
}

const useAwareness = ({ editor }: AwarenessProps) => {
  const [users, setUsers] = useState<Record<string, any>>({});
  const [cursorPositions, setCursorPositions] = useState<Record<string, any>>({});

  useEffect(() => {
    const handleUserJoin = (user: string) => {
      setUsers((prevUsers) => ({ ...prevUsers, [user]: { color: getRandomColor() } }));
    };

    const handleUserLeave = (user: string) => {
      setUsers((prevUsers) => ({ ...prevUsers, [user]: null }));
    };

    editor.on('userJoin', handleUserJoin);
    editor.on('userLeave', handleUserLeave);

    return () => {
      editor.off('userJoin', handleUserJoin);
      editor.off('userLeave', handleUserLeave);
    };
  }, [editor]);

  useEffect(() => {
    const handleCursorMove = (user: string, position: number) => {
      setCursorPositions((prevPositions) => ({ ...prevPositions, [user]: position }));
    };

    editor.on('cursorMove', handleCursorMove);

    return () => editor.off('cursorMove', handleCursorMove);
  }, [editor]);

  return { users, cursorPositions };
};

export default useAwareness;