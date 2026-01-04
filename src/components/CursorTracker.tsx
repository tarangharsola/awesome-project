{"import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

interface Props {
  editorState: EditorState;
  onCursorChange: (cursorPosition: number) => void;
}

const CursorTracker = ({ editorState, onCursorChange }: Props) => {
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const handleEditorStateChange = (editorState: EditorState) => {
      const cursorPosition = editorState.getCurrentContent().getSelection().getStartOffset();
      setCursorPosition(cursorPosition);
      onCursorChange(cursorPosition);
    };

    editorState.subscribe(handleEditorStateChange);
    return () => editorState.unsubscribe(handleEditorStateChange);
  }, [editorState, onCursorChange]);

  return (
    <div className='cursor-tracker'>
      <span className='cursor-position'>{cursorPosition}</span>
    </div>
  );
};

export default CursorTracker;