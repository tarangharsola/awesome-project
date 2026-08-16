import { useState, useEffect } from 'react';

const useEditor = (language: string) => {
  const [editorRef, setEditorRef] = useState(null);
  useEffect(() => {
    // Update editor here
  }, []);
  return { editorRef, language };
};

export default useEditor;