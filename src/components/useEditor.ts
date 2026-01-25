{"import { useState, useEffect } from 'react';
import { EditorState, Editor } from 'react-simple-editor';
import MonacoEditor from 'react-monaco-editor';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [code, setCode] = useState('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleCodeChange = (code: string) => {
    setCode(code);
  };

  return {
    language,
    editorState,
    code,
    handleLanguageChange,
    handleCodeChange
  };
};

export default useEditor;