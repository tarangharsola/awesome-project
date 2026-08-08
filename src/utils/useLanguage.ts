{"import { useState, useEffect } from 'react';

interface LanguageState {
  language: string;
}

const useLanguage = () => {
  const [languageState, setLanguageState] = useState<LanguageState>({ language: '' });
  useEffect(() => {
    // Update language from WebSocket events
  }, []);
  return { language: languageState.language, onChange: (language: string) => setLanguageState({ language }) };
};

export default useLanguage;