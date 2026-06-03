{"import { useState, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.create());

  useEffect(() => {
    const view = new EditorView({ state: editorState });
    const cursorPosition = view.state.doc.pos;
    setCursorPosition(cursorPosition);
  }, [editorState]);

  return cursorPosition;
};

export default useCursor;