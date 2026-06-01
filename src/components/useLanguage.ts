{"import React from 'react';
import { useReducer, useState } from 'react';

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' }
];

const useLanguage = () => {
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [formattingDefaults, setFormattingDefaults] = useState({});

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    formattingDefaults,
    handleLanguageChange
  };
};

export default useLanguage;