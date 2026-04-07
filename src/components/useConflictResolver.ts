{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-react';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState({}
  const [conflict, setConflict] = useState(null);

  useEffect(() => {
    const ot = new OperationalTransformation();
    ot.subscribe(editorState, setEditorState);
    return () => ot.unsubscribe();
  }, []);

  const handleConflict = (conflict) => {
    setConflict(conflict);
  };

  return { editorState, conflict, handleConflict };
};

export default useConflictResolver;