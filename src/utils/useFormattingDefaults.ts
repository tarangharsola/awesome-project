// src/utils/useFormattingDefaults.ts
export interface FormattingOptions {
  tabSize: number;
  insertSpaces: boolean;
}

export const getFormattingDefaults = (language: string): FormattingOptions => {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return { tabSize: 2, insertSpaces: true };
    case 'python':
      return { tabSize: 4, insertSpaces: true };
    case 'html':
      return { tabSize: 2, insertSpaces: true };
    default:
      return { tabSize: 2, insertSpaces: true };
  }
};