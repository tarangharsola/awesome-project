{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ users, cursorPositions }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [cursorPosition, setCursorPosition] = useState({});

  useEffect(() => {
    const cursorPosition = cursorPositions[users[0].id];
    if (cursorPosition) {
      setCursorPosition(cursorPosition);
    }
  }, [users, cursorPositions]);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <EditorState editorState={editorState} onEditorChange={handleEditorChange} />
      <div style={{ position: 'absolute', top: cursorPosition.top, left: cursorPosition.left, backgroundColor: users[0].color, width: 2, height: 2 }} />
    </div>
  );
}
export default Editor;