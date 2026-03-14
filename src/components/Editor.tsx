{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

interface EditorProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
}

const Editor: React.FC<EditorProps> = ({ editorState, onEditorChange }) => {
  const [editorStateLocal, setEditorStateLocal] = useState(editorState);

  useEffect(() => {
    setEditorStateLocal(editorState);
  }, [editorState]);

  const handleEditorChange = (editorState: EditorState) => {
    onEditorChange(editorState);
    setEditorStateLocal(editorState);
  };

  return (
    <div className="editor">
      <EditorState editorState={editorStateLocal} onEditorChange={handleEditorChange} />
    </div>
  );

  return Editor;
}

export default Editor;