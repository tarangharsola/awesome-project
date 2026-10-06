import { Language } from '../types/editor';

/**
 * Returns sensible default formatting options for the supported languages.
 * These options are used when initializing the editor instance.
 */
export const useFormattingDefaults = (language: Language) => {
  switch (language) {
    case 'javascript':
      return {
        tabSize: 2,
        insertSpaces: true,
        autoCloseBrackets: true,
        formatOnPaste: true,
      } as const;
    case 'python':
      return {
        tabSize: 4,
        insertSpaces: true,
        autoCloseBrackets: false,
        formatOnPaste: false,
      } as const;
    case 'html':
      return {
        tabSize: 2,
        insertSpaces: true,
        autoCloseBrackets: true,
        formatOnPaste: true,
      } as const;
    default:
      return {
        tabSize: 2,
        insertSpaces: true,
        autoCloseBrackets: true,
        formatOnPaste: true,
      } as const;
  }
};
