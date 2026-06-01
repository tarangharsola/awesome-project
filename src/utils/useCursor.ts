{"import { useState, useEffect } from 'react';

interface Props {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string }
}

const useCursor = ({ cursor, user }) => {
  const [cursorState, setCursorState] = useState(cursor);
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    setCursorState(cursor);
    setUserState(user);
  }, [cursor, user]);

  return [cursorState, userState];
};

export default useCursor;