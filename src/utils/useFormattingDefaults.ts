/**
 * Returns default formatting options for a given language.
 * Currently provides tabSize and indentWithTabs.
 */
export const getDefaultFormatting = (language: string) => {
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
