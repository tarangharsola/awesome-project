{"import { useState, useEffect } from 'react';

interface EditorState {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const useEditor = (): EditorState => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleEditorChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setValue('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    value,
    onChange: handleEditorChange,
    language,
    setLanguage,
  };
}

export default useEditor;