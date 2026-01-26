{"import { useState, useEffect } from 'react';

interface useEditorProps {
  operations: any[];
}

const useEditor = ({ operations }: useEditorProps) => {
  const [editor, setEditor] = useState({ operations });
  useEffect(() => {
    setEditor({ operations });
  }, [operations]);
  return editor;
};

export default useEditor;