{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

const CursorTracker = () => {
  const [cursors, setCursors] = useState([]);
  const [view, setView] = useState(null);

  useEffect(() => {
    const handleCursorChange = (cursor) => {
      setCursors((prevCursors) => [...prevCursors, cursor]);
    };

    const handleCursorRemove = (cursorID) => {
      setCursors((prevCursors) => prevCursors.filter((cursor) => cursor.id !== cursorID));
    };

    const view = new EditorView(document.getElementById('editor'), {
      dispatchTransaction: (transaction) => {
        // Handle cursor changes and removals
      },
    });
    setView(view);
    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div id="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          position: 'absolute',
          top: cursor.pos.top,
          left: cursor.pos.left,
          backgroundColor: cursor.color,
          width: 2,
          height: 2,
        }} />
      ))}
    </div>
  );
};

export default CursorTracker;