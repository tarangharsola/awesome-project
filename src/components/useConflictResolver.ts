{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    if (editor.hasConflict) {
      setConflict(true);
    } else {
      setConflict(false);
    }
  }, [editor.hasConflict]);

  return conflict;
};

export default useConflictResolver;