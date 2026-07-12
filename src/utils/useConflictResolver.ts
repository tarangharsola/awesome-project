{"import { useState, useEffect } from 'react';
import { editorState } from './editorState';

function useConflictResolver() {
  const [editorState, setEditorState] = useState(editorState);

  useEffect(() => {
    setEditorState(editorState);
  }, [editorState]);

  return editorState;
}

export default useConflictResolver;