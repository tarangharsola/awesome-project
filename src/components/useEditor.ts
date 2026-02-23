{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';

interface Props {
  onChange: (state: EditorState) => void;
  value: string;
}

const useEditor = ({ onChange, value }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(value)));

  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromText(value)));
  }, [value]);

  const handleChange = (state: EditorState) => {
    onChange(state);
    setEditorState(state);
  };

  return {
    editorState,
    onChange: handleChange,
  };
};

export default useEditor;