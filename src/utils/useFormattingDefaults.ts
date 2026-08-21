import { Language } from '../store/editorReducer';

export interface FormattingOptions {
  tabSize: number;
  insertSpaces: boolean;
  autoClosingBrackets: boolean;
  formatOnPaste: boolean;
}

export const getFormattingDefaults = (language: Language): FormattingOptions => {
  switch (language) {
    case 'python':
      return {
        tabSize: 4,
        insertSpaces: true,
        autoClosingBrackets: false,
        formatOnPaste: false,
      };
    case 'html':
      return {
        tabSize: 2,
        insertSpaces: true,
        autoClosingBrackets: true,
        formatOnPaste: true,
      };
    case 'javascript':
    default:
      return {
        tabSize: 2,
        insertSpaces: true,
        autoClosingBrackets: true,
        formatOnPaste: true,
      };
  }
};