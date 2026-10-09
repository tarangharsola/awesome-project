type Language = 'javascript' | 'python' | 'html';

export function getFormattingDefaults(language: Language) {
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
}
