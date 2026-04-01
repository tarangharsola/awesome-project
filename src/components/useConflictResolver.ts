{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState({});
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    const ot = new OperationalTransformation();
    const handleChanges = (changes) => {
      setEditorState(ot.applyChanges(editorState, changes));
      setConflicts(ot.getConflicts(editorState, changes));
    };

    return () => {
      ot.dispose();
    };
  }, []);

  return {
    editorState,
    conflicts,
    handleChanges
  };
};

export default useConflictResolver;