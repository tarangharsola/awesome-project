{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

const CursorTracker = () => {
  const [view, setView] = useState(null);
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setCursors((prevCursors) => [...prevCursors, cursor]);
    };

    const handleCursorRemove = (cursorID) => {
      setCursors((prevCursors) => prevCursors.filter((cursor) => cursor.id !== cursorID));
    };

    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: cursor.pos,
          top: 0,
          width: 2,
          height: '100%',
          backgroundColor: cursor.color,
        }} />
      ))}
    </div>
  );
};

export default CursorTracker;