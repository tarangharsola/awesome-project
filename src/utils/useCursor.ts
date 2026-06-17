{"import { useState, useEffect } from 'react';

interface Props {
  roomId: string;
}

const useCursor = ({ roomId }: Props) => {
  const [cursors, setCursors] = useState({} as any);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);

    ws.onmessage = (event) => {
      const cursor = JSON.parse(event.data);
      setCursors((prevCursors) => ({ ...prevCursors, [cursor.userId]: cursor }));
    };

    return () => {
      ws.close();
    };
  }, []);

  return { cursors };
}

export default useCursor;