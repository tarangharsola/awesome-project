{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const useConflictResolver = ({ editor }: ConflictResolverProps) => {
  const [conflicts, setConflicts] = useState<Record<string, any>>({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const handleConflict = (path: string, value: any) => {
      setConflicts((prevConflicts) => ({ ...prevConflicts, [path]: value }));
    };

    editor.on('conflict', handleConflict);

    return () => editor.off('conflict', handleConflict);
  }, [editor]);

  useEffect(() => {
    if (Object.keys(conflicts).length === 0) {
      setResolved(true);
    }
  }, [conflicts]);

  return { conflicts, resolved };
};

export default useConflictResolver;