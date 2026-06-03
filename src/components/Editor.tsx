{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ editor }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (editor) {
      setEditorState(editor);
    }
  }, [editor]);

  const handleCursorChange = (position) => {
    setCursorPosition(position);
  };

  return (
    <div>
      <div className='editor' contentEditable={true} suppressContentEditableWarning={true} onInput={(event) => {
        const content = event.target.innerHTML;
        const editorState = EditorState.push(editorState, ContentState.createFromText(content));
        setEditorState(editorState);
        ws.send(JSON.stringify({ type: 'editor', editor: editorState }));
      }}>
        {editorState.getCurrentContent().getPlainText()}
      </div>
      <div className='cursor' style={{ left: cursorPosition.x + 'px', top: cursorPosition.y + 'px' }} />
    </div>
  );
}

export default Editor;