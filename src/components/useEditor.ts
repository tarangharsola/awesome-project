{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { MonacoEditor } from 'react-monaco-editor';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };

    const handleCodeChange = (event) => {
      setCode(event.target.value);
    };

    const handleEditorChange = (editor) => {
      setEditor(editor);
    };

    document.addEventListener('languageChange', handleLanguageChange);
    document.addEventListener('codeChange', handleCodeChange);
    document.addEventListener('editorChange', handleEditorChange);

    return () => {
      document.removeEventListener('languageChange', handleLanguageChange);
      document.removeEventListener('codeChange', handleCodeChange);
      document.removeEventListener('editorChange', handleEditorChange);
    };
  }, []);

  return {
    language,
    code,
    editor,
    setLanguage,
    setCode,
    setEditor
  };
};

export default useEditor;