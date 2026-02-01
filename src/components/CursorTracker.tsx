import React, { useState, useEffect } from 'react';
import { useCursor } from './useCursor';
import { useUsers } from './useUsers';

interface CursorTrackerProps {
  userId: string;
  cursorPosition: number;
  userName: string;
  userColor: string;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({
  userId,
  cursorPosition,
  userName,
  userColor,
}) => {
  const { cursors, setCursor } = useCursor();
  const { users, setUsers } = useUsers();

  useEffect(() => {
    setCursor(userId, cursorPosition);
  }, [userId, cursorPosition]);

  return (
    <div
      style={{
        position: 'absolute',
        top: cursorPosition,
        left: 0,
        width: '100%',
        height: 2,
        backgroundColor: userColor,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: cursorPosition - 10,
          left: 0,
          fontSize: 12,
          color: 'white',
        }}
      >
        {userName}
      </span>
    </div>
  );
};

export default CursorTracker;