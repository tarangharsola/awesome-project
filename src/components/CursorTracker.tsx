{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

interface Props {
  editorView: EditorView;
}

const CursorTracker: React.FC<Props> = ({ editorView }) => {
  const [cursorPositions, setCursorPositions] = useState({} as { [key: string]: number });

  useEffect(() => {
    const handleCursorChange = (from: number, to: number) => {
      const userId = editorView.state.selection.from.user;
      setCursorPositions((prevPositions) => ({ ...prevPositions, [userId]: from }));
    };
    editorView.on('selectionChange', handleCursorChange);
    return () => {
      editorView.off('selectionChange', handleCursorChange);
    };
  }, [editorView]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((userId) => (
        <div key={userId} style={{
          position: 'absolute',
          left: cursorPositions[userId],
          top: 0,
          width: 2,
          height: '100%',
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }}>
          <span style={{
            position: 'absolute',
            left: -10,
            top: -10,
            fontSize: 12,
            color: 'white'
          }}>{userId}</span>
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;