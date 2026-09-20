export interface FormattingDefaults {
  tabSize: number;
  indentUnit: string;
}

/**
 * Returns sensible formatting defaults for supported languages.
 * Currently supports JavaScript, Python, and HTML.
 */
export const getFormattingDefaults = (language: string): FormattingDefaults => {
  switch (language) {
    case 'javascript':
      return { tabSize: 2, indentUnit: '  ' };
    case 'python':
      return { tabSize: 4, indentUnit: '    ' };
    case 'html':
      return { tabSize: 2, indentUnit: '  ' };
    default:
      return { tabSize: 2, indentUnit: '  ' };
  }
};

/**
 * Hook wrapper for convenience inside React components.
 */
import { useMemo } from 'react';
export const useFormattingDefaults = (language: string) => {
  return useMemo(() => getFormattingDefaults(language), [language]);
};
