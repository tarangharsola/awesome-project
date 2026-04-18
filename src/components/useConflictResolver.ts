{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState({});
  const { editor } = useEditor();

  useEffect(() => {
    const handleEditorChange = (delta) => {
      // Handle conflicts by merging changes
      const mergedDelta = mergeDeltas(delta);
      setEditorState({ ...editorState, ...mergedDelta });
    };

    editor.on('change', handleEditorChange);
    return () => editor.off('change', handleEditorChange);
  }, [editor]);

  return editorState;
};

export default useConflictResolver;