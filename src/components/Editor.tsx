{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ value, onChange }) {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(value)));

  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromText(value)));
  }, [value]);

  const handleEditorChange = (editorState) => {
    onChange(editorState.getCurrentContent().getPlainText());
  };

  return (
    <div className='editor' contentEditable={true} suppressContentEditableWarning={true} onInput={handleEditorChange}>
      {editorState.getCurrentContent().getPlainText()}
    </div>
  );
}

export default Editor;