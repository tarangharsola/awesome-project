{"import { useState, useEffect } from 'react';
import { EditorState } from 'react-editor-js';

const useEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    // Handle editor state changes
  }, [editorState]);
  return { editorState, setEditorState };
};

export default useEditor;