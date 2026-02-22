{"import React from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

interface Editor {
  language: string;
  code: string;
  setCode: (code: string) => void;
}

const useEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const languageData = useLanguage();

  useEffect(() => {
    if (languageData) {
      setLanguage(languageData.syntax);
    }
  }, [languageData]);

  const handleCodeChange = (code: string) => {
    setCode(code);
 );

  return { language, code, setCode: handleCodeChange };
};

export default useEditor;