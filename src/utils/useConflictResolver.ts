{"import { useState, useEffect } from 'react';
import { EditorState, ConflictResolver } from 'prosemirror-state';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState(EditorState.create());
  const [conflictResolver, setConflictResolver] = useState(new ConflictResolver());

  useEffect(() => {
    const handleEditorChange = (newEditorState) => {
      setEditorState(newEditorState);
      setConflictResolver(new ConflictResolver(newEditorState));
    };

    return () => {
      // Clean up editor change handler
    };
  }, []);

  return {
    editorState,
    conflictResolver
  };
};

export default useConflictResolver;