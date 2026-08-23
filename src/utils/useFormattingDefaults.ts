export type FormattingOptions = {
  tabSize: number;
  insertSpaces: boolean;
  autoCloseBrackets: boolean;
};
export const getFormattingDefaults = (language: string): FormattingOptions => {
  switch (language) {
    case 'javascript':
    case 'python':
      return { tabSize: 2, insertSpaces: true, autoCloseBrackets: true };
    case 'html':
      return { tabSize: 2, insertSpaces: true, autoCloseBrackets: false };
    default:
      return { tabSize: 2, insertSpaces: true, autoCloseBrackets: true };
  }
};
export default getFormattingDefaults;