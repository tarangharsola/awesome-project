import { useState, useEffect } from 'react';

interface useCursorProps {
  editor: any;
  webSocket: any;
}

const useCursor = ({ editor, webSocket }: useCursorProps) => {
  const [cursor, setCursor] = useState({ position: 0 });
  const { send } = webSocket;

  useEffect(() => {
    const handleCursorMove = (cursor: any) => {
      setCursor(cursor);
    };

    send({ type: 'cursorMove', cursor });
    return () => {
      send({ type: 'cursorMove', cursor: null });
    };
  }, [send]);

  return cursor;
};

export default useCursor;