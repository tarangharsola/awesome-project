{"import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const useEditor = () => {
  const [language, setLanguage] = useState(Languages.javascript);
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

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
    setFormattedCode(prism.highlight(code, Highlight.javascript, Languages.javascript));
  };

  return {
    language,
    code,
    formattedCode,
    handleLanguageChange,
    handleCodeChange
  };
};

export default useEditor;