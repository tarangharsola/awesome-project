{"import React from 'react';
import { useState, useEffect } from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const [cursor, setCursor] = useState(null);
  const { cursor: cursorState, error, loading } = useCursor();

  useEffect(() => {
    setCursor(cursorState);
  }, [cursorState]);

  if (loading) return <div>Loading...</div);
  if (error) return <div>Error: {error.message}</div);

  return (
    <div>
      {cursor && (
        <div style={{
          position: 'absolute',
          top: cursor.top,
          left: cursor.left,
          backgroundColor: cursor.color,
          width: '5px',
          height: '5px',
          borderRadius: '5px',
        }}>
        </div>
      )}
    </div>
  );
};

export default CursorTracker;