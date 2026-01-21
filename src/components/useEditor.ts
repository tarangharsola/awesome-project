{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [fontSize, setFontSize] = useState(14);

  const handleLanguageChange = (language) => {
    setLanguage(language);
    setValue('');
  };

  const handleValueChange = (value) => {
    setValue(value);
  };

  const handleFontSizeChange = (fontSize) => {
    setFontSize(fontSize);
  };

  return {
    language,
    value,
    fontSize,
    handleLanguageChange,
    handleValueChange,
    handleFontSizeChange,
  };
};

export default useEditor;