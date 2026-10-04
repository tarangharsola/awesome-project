export const getDefaultFormattingOptions = (language: string) => {
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