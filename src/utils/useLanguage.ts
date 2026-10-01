import { useState, useEffect } from 'react';

export type Language = 'javascript' | 'python' | 'html';

/**
 * Hook to manage the current programming language for the editor.
 * Persists the selection in localStorage so it survives page reloads.
 */
export const useLanguage = (): [Language, (lang: Language) => void] => {
  const [language, setLanguage] = useState<Language>('javascript');

  // Load persisted language on mount
  useEffect(() => {
    const stored = localStorage.getItem('collab-editor-language') as Language | null;
    if (stored) {
      setLanguage(stored);
    }
  }, []);

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('collab-editor-language', lang);
  };

  return [language, updateLanguage];
};
