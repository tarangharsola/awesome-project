{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const editor = useEditor();

  useEffect(() => {
    const handleAwareness = (awareness) => {
      setAwareness(awareness);
    };

    editor.on('awareness', handleAwareness);

    return () => {
      editor.off('awareness', handleAwareness);
    };
  }, []);

  return awareness;
};

export default useAwareness;