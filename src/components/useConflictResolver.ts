{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

const useConflictResolver = () => {
  const { editorState, setEditorState } = useEditor();
  const { sendOperation } = useWebSocket();

  useEffect(() => {
    const handleOperation = (operation) => {
      if (operation.type === 'insert' && editorState.selection.start !== operation.position) {
        setEditorState((prev) => ({ ...prev, selection: { start: operation.position, end: operation.position } }));
      }
    };

    sendOperation({ type: 'listen', data: { handleOperation } });
  }, []);

  return {
    editorState,
    setEditorState,
  };
};

export default useConflictResolver;