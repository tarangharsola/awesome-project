{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState({}
  const { editor } = useEditor();
  const { socket } = useWebSocket();

  useEffect(() => {
    const handleEditorChange = (delta) => {
      const { ops } = delta;
      const resolvedOps = resolveConflicts(ops);
      setEditorState((prev) => ({ ...prev, ...resolvedOps }));
    };

    editor.on('change', handleEditorChange);

    return () => {
      editor.off('change', handleEditorChange);
    };
  }, []);

  useEffect(() => {
    const handleSocketMessage = (message) => {
      if (message.type === 'update') {
        const { ops } = message.data;
        const resolvedOps = resolveConflicts(ops);
        setEditorState((prev) => ({ ...prev, ...resolvedOps }));
      }
    };

    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, []);

  return editorState;
};

const resolveConflicts = (ops) => {
  // Implement conflict resolution logic here
  return ops;
};

export default useConflictResolver;