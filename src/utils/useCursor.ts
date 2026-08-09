{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useCursor = () => {
  const { users } = useWebSocket();
  const [cursor, setCursor] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleCursorChanges = (changes) => {
      setCursor(changes.cursor);
    };
    users.on('cursorChanges', handleCursorChanges);
    return () => users.off('cursorChanges', handleCursorChanges);
  }, [users]);

  return { cursor, users };
};

export default useCursor;