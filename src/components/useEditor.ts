{"import { useState, useEffect } from 'react';

interface EditorState {
  value: string;
  language: string;
}

const useEditor = (initialValue: string, initialLanguage: string) => {
  const [state, setState] = useState({ value: initialValue, language: initialLanguage });
  const [languageState, setLanguageState] = useState(initialLanguage);

  useEffect(() => {
    setState({ value: initialValue, language: initialLanguage });
    setLanguageState(initialLanguage);
  }, [initialValue, initialLanguage]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguageState(newLanguage);
  };

  return [state, handleLanguageChange];
}

export default useEditor;