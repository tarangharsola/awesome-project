import React from 'react';
import { useCursor } from './useCursor';
import { useUsers } from './useUsers';

interface CursorTrackerProps {
  cursor: { id: string; x: number; y: number };
  users: { id: string; name: string; color: string }[];
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursor, users }) => {
  const { id, x, y } = cursor;
  const { name, color } = users.find((user) => user.id === id);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'pointer',
      }}
    >
      <span style={{ position: 'absolute', top: -15, left: -15, fontSize: 12 }}>
        {name}
      </span>
    </div>
  );
};

export default CursorTracker;