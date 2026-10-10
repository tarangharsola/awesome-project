export const useFormattingDefaults = (language: string) => {
  switch (language) {
    case 'javascript':
      return { semi: true, singleQuote: true, trailingComma: 'es5' };
    case 'python':
      return { indentSize: 4, maxLineLength: 88 };
    case 'html':
      return { wrapAttributes: 'auto', wrapLineLength: 120 };
    default:
      return {};
  }
};
