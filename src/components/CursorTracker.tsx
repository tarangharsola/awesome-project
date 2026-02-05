{"import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

interface Props {
  editorState: EditorState;
  onChange: (state: EditorState) => void;
}

const CursorTracker: React.FC<Props> = ({ editorState, onChange }) => {
  const [cursorPosition, setCursorPosition] = useState(editorState.getCurrentContent().getSelection().getFocusOffset());

  useEffect(() => {
    const handleSelectionChange = () => {
      setCursorPosition(editorState.getCurrentContent().getSelection().getFocusOffset());
    };

    editorState.addChangeListener(handleSelectionChange);
    return () => editorState.removeChangeListener(handleSelectionChange);
  }, [editorState]);

  return (
    <div style={{ position: 'absolute', top: 0, left: cursorPosition + 'px' }}>
      <span style={{ color: 'red' }}>{editorState.getCurrentContent().getSelection().getFocusOffset()}</span>
    </div>
  );
};

export default CursorTracker;