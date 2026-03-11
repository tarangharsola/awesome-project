{"import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const useEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(Languages.javascript);

  useEffect(() => {
    Highlight.init(Languages[language]);
  }, [language]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return {
    code,
    language,
    handleCodeChange,
  };
};

export default useEditor;