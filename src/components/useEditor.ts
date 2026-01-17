{"import { useState, useEffect } from 'react';
import { Editor } from 'slate-react';

const useEditor = () => {
  const [editor, setEditor] = useState<Editor>();
  const [language, setLanguage] = useState<string>('javascript');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage('javascript');
    };

    return handleLanguageChange;
  }, []);

  return {
    editor,
    language,
    setLanguage,
  };
}

export default useEditor;