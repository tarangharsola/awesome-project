{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return {
    language,
    theme,
    value,
    setValue,
    handleLanguageChange,
    handleThemeChange
  };
};

export default useEditor;