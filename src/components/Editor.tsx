{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const handleChanges = (newEditorState) => {
      setEditorState(newEditorState);
    };

    return () => {
      // Clean up
    };
  }, []);

  return (
    <div className="editor">
      <EditorState editorState={editorState} />
    </div>
  );
};

export default Editor;