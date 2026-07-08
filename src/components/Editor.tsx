{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ editor }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (editor) {
      setEditorState(editor);
    }
  }, [editor]);

  const handleChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="editor">
      <EditorState editorState={editorState} onChange={handleChange} />
    </div>
  );
}

export default Editor;