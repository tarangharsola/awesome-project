type FormattingOptions = {
  indentUnit: number;
  tabSize: number;
  lineWrapping: boolean;
};

export const getFormattingDefaults = (language: string): FormattingOptions => {
  switch (language) {
    case 'javascript':
    case 'python':
      return { indentUnit: 2, tabSize: 2, lineWrapping: true };
    case 'html':
      return { indentUnit: 2, tabSize: 2, lineWrapping: false };
    default:
      return { indentUnit: 2, tabSize: 2, lineWrapping: true };
  }
};