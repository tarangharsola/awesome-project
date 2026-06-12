{"import React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';

interface Props {
  users: User[];
}

const CursorTracker = ({ users }: Props) => {
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    const userCursors = users.reduce((acc, user) => {
      acc[user.id] = {
        x: user.cursorX,
        y: user.cursorY,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      };
      return acc;
    }, {});
    setCursors(userCursors);
  }, [users]);

  return (
    <div className="cursors">
      {Object.keys(cursors).map(id => (
        <div key={id} style={{
          position: 'absolute',
          top: cursors[id].y,
          left: cursors[id].x,
          width: '2px',
          height: '2px',
          backgroundColor: cursors[id].color,
          borderRadius: '50%',
          zIndex: 1
        }}>
        <span style={{
          position: 'absolute',
          top: cursors[id].y - 15,
          left: cursors[id].x - 10,
          fontSize: '12px',
          color: 'white',
          backgroundColor: cursors[id].color,
          padding: '5px',
          borderRadius: '5px'
        }}>{users.find(user => user.id === id).name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;