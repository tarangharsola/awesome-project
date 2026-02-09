{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

const CursorTracker = () => {
  const [cursors, setCursors] = useState([]);
  const [view, setView] = useState(null);

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setCursors((prevCursors) => [...prevCursors, cursor]);
    };

    const handleCursorRemove = (cursor) => {
      setCursors((prevCursors) => prevCursors.filter((c) => c.id !== cursor.id));
    };

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="cursor-tracker">
      {cursors.map((cursor) => (
        <div key={cursor.id} style={{
          position: 'absolute',
          left: cursor.pos - 10,
          top: cursor.line - 10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: cursor.color,
        }}>
          <span>{cursor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;