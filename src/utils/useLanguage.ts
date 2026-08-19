import { useState, useCallback } from 'react';
import { LanguageSupport } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

export type Language = 'javascript' | 'python' | 'html';

const languageExtensions: Record<Language, LanguageSupport> = {
  javascript,
  python,
  html,
};

/**
 * Hook to manage the current programming language for the editor.
 * Returns the selected language, a setter, and the corresponding CodeMirror extension.
 */
export const useLanguage = (initial: Language = 'javascript') => {
  const [language, setLanguage] = useState<Language>(initial);
  const getExtension = useCallback(() => languageExtensions[language], [language]);
  return { language, setLanguage, getExtension };
};