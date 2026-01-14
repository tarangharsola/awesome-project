{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return {
    language,
    code,
    theme,
    handleLanguageChange,
    handleCodeChange,
    handleThemeChange,
  };
};

export default useEditor;