{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ language, cursorPositions }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [cursorPosition, setCursorPosition] = useState({});

  useEffect(() => {
    const cursorPositions = cursorPositions[language];
    if (cursorPositions) {
      setCursorPosition(cursorPositions);
    }
  }, [cursorPositions, language]);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <EditorState
        editorState={editorState}
        onChange={handleEditorChange}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        {Object.keys(cursorPositions).map((userId) => (
          <div key={userId} style={{
            position: 'absolute',
            top: cursorPositions[userId].top,
            left: cursorPositions[userId].left,
            width: 2,
            height: 2,
            backgroundColor: cursorPositions[userId].color,
          }}/>
        ))}
      </div>
    </div>
  );
}

export default Editor;