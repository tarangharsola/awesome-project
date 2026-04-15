{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useLanguage = () => {
  const editor = useEditor();
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    setLanguage(editor.getLanguage);
  }, [editor.getLanguage]);

  return language;
};

export default useLanguage;