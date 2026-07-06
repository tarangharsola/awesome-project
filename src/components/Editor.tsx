{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor({ content }) {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(content)));

  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromText(content)));
  }, [content]);

  const handleContentChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className='editor' onContentStateChange={handleContentChange}>
      <EditorState contentState={editorState} />
    </div>
  );
}

export default Editor;