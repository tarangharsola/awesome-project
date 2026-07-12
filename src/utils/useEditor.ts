{"import { useState, useEffect } from 'react';
import { editorState } from './editorState';

function useEditor() {
  const [editorState, setEditorState] = useState(editorState);

  useEffect(() => {
    setEditorState(editorState);
  }, [editorState]);

  return editorState;
}

export default useEditor;