/**
 * Returns sensible formatting defaults for supported languages.
 * Currently used to configure the editor's tab size and indentation style.
 */
export const getFormattingDefaults = (language: string) => {
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
