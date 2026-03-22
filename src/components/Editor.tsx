{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'draft-js/dist/draft.min.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentState = ContentState.createFromText(value);
    const editorState = EditorState.push(editorState, contentState);
    setEditorState(editorState);
  }, [value]);

  const onChangeHandler = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    onChange(JSON.stringify(rawContentState));
  };

  return (
    <div className="editor">
      <EditorState onChange={onChangeHandler} editorState={editorState} />
    </div>
  );

  return Editor;
}
export default Editor;