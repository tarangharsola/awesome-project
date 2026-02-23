{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import useEditor from './useEditor';

interface Props {
  onChange: (state: EditorState) => void;
  value: string;
}

const Editor = ({ onChange, value }: Props) => {
  const { editorState, onChange: handleEditorChange } = useEditor({ onChange, value });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onChange(EditorState.createEmpty());
    }
  };

  return (
    <div className="editor">
      <EditorState onChange={handleEditorChange} onKeyPress={handleKeyDown} />
    </div>
  );
};

export default Editor;