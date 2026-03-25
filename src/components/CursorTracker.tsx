import React from 'react';
import { EditorState } from 'draft-js';

const CursorTracker = ({ editorState, users }) => {
  const cursorPositions = users.map((user) => ({
    x: user.cursorPosition.x,
    y: user.cursorPosition.y,
    color: user.color,
  }));

  return (
    <div>
      {cursorPositions.map((cursorPosition, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: 2,
          height: 2,
          backgroundColor: cursorPosition.color,
        }} />
      ))}
    </div>
  );
};

export default CursorTracker;