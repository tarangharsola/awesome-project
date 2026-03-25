{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState({});
  const [conflict, setConflict] = useState(null);

  useEffect(() => {
    const ot = new OperationalTransformation();
    ot.subscribe((delta) => {
      setEditorState((prev) => ({ ...prev, ...delta }));
    });
  }, []);

  const resolveConflict = (delta) => {
    setEditorState((prev) => ({ ...prev, ...delta }));
    setConflict(null);
 );

  return { editorState, conflict, resolveConflict };
};

export default useConflictResolver;