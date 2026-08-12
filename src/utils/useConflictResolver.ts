{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState({});
  const { editor } = useEditor();
  const { users } = useUsers();

  useEffect(() => {
    const handleEditorChange = (newState) => {
      // Handle conflicts by merging user changes
      const mergedState = mergeConflicts(editorState, newState);
      setEditorState(mergedState);
    };

    editor.on('change', handleEditorChange);
    return () => editor.off('change', handleEditorChange);
  }, [editor, editorState]);

  return editorState;
};

export default useConflictResolver;