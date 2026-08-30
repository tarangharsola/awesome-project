import { Language } from '../types/editor';

export interface FormattingOptions {
  tabSize: number;
  insertSpaces: boolean;
  // extend with more options as needed
}

export const getFormattingDefaults = (language: Language): FormattingOptions => {
  switch (language) {
    case 'javascript':
      return { tabSize: 2, insertSpaces: true };
    case 'python':
      return { tabSize: 4, insertSpaces: true };
    case 'html':
      return { tabSize: 2, insertSpaces: true };
    default:
      return { tabSize: 2, insertSpaces: true };
  }
};
