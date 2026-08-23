import { useState, useCallback } from 'react';
export type Language = 'javascript' | 'python' | 'html';
const languageExtensions = {
  javascript: ['javascript'],
  python: ['python'],
  html: ['html']
} as const;
export const useLanguage = (initial: Language = 'javascript') => {
  const [language, setLanguage] = useState<Language>(initial);
  const setLang = useCallback((lang: Language) => {
    if (languageExtensions[lang]) {
      setLanguage(lang);
    }
  }, []);
  return { language, setLanguage: setLang, extensions: languageExtensions[language] };
};
export default useLanguage;