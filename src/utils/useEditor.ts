{"import { useState, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const useEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.create());

  useEffect(() => {
    const view = new EditorView({ state: editorState });
    const editorState = view.state.doc.toString();
    setEditorState(editorState);
  }, [editorState]);

  return editorState;
};

export default useEditor;