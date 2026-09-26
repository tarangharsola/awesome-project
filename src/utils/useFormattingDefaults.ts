// src/utils/useFormattingDefaults.ts
/**
 * Provides language‑specific formatting defaults used when a user switches the editor language.
 * The defaults are simple key/value pairs that can be consumed by the editor component or a formatter.
 */
export const getFormattingDefaults = (language: string): Record<string, any> => {
  switch (language) {
    case 'javascript':
      return {
        tabSize: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
      };
    case 'python':
      return {
        tabSize: 4,
        useTabs: false,
        trailingComma: false,
      };
    case 'html':
      return {
        tabSize: 2,
        useTabs: false,
        wrapLineLength: 80,
      };
    default:
      return {};
  }
};
