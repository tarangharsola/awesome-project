export const getFormattingDefaults = (language) => {
  switch (language) {
    case 'python':
      return { tabSize: 4, insertSpaces: true };
    case 'html':
      return { tabSize: 2, insertSpaces: true };
    default:
      // javascript and fallback
      return { tabSize: 2, insertSpaces: true };
  }
};

export default getFormattingDefaults;
