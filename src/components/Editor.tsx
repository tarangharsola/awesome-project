{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ editor }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (editor) {
      setEditorState(editor);
      setCursorPosition(editor.getCursorPosition());
    }
  }, [editor]);

  const handleTextChange = (editorState) => {
    setEditorState(editorState);
    const cursorPosition = editorState.getCursorPosition();
    setCursorPosition(cursorPosition);
    ws.send(JSON.stringify({ type: 'editor', editor: editorState.toJS() }));
  };

  return (
    <div>
      <EditorState editorState={editorState} onEditorStateChange={handleTextChange} />
      <div style={{ position: 'absolute', left: cursorPosition.x, top: cursorPosition.y, backgroundColor: 'red', width: 10, height: 10 }} />
    </div>
  );
}

export default Editor;