{"import { useState, useEffect } from 'react';
import { LanguageSelector } from './LanguageSelector';

const useLanguage = () => {
  const [language, setLanguage] = useState('');
  useEffect(() => {
    // Handle language changes
  }, [language]);
  return [language, setLanguage];
};

export default useLanguage;