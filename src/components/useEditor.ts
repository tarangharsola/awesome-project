{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return {
    language,
    value,
    theme,
    handleLanguageChange,
    handleThemeChange,
  };
};

export default useEditor;