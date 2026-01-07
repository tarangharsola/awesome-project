{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [code, setCode] = useState("// Your code here");
  const [language, setLanguage] = useState(Languages.javascript);

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return {
    code,
    language,
    handleCodeChange,
    handleLanguageChange,
  };
};

export default useEditor;