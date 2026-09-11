export type FormattingOptions = {
  tabSize: number;
  indentWithTabs: boolean;
};

export const getFormattingDefaults = (language: string): FormattingOptions => {
  switch (language) {
    case 'python':
      return { tabSize: 4, indentWithTabs: false };
    case 'html':
      return { tabSize: 2, indentWithTabs: false };
    case 'javascript':
    default:
      return { tabSize: 2, indentWithTabs: false };
  }
};

export default getFormattingDefaults;
