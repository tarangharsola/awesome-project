{"import { useState, useEffect } from 'react';

interface LanguageMap {
  [language: string]: string;
}

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [document, setDocument] = useState('');
  const [languageMap, setLanguageMap] = useState<LanguageMap>({ 'javascript': 'javascript', 'python': 'python', 'html': 'html' });

  useEffect(() => {
    // Load language map from storage or API
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  }

  return {
    language,
    languageMap,
    handleLanguageChange,
  };
}

export default useEditor;