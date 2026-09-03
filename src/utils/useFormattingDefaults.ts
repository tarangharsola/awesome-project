import { EditorFormattingOptions } from '../types/editor';

export const useFormattingDefaults = (language: string): EditorFormattingOptions => {
  // Define per-language defaults; can be extended later
  const defaults: Record<string, EditorFormattingOptions> = {
    javascript: {
      tabSize: 2,
      insertSpaces: true,
      autoCloseBrackets: true,
    },
    python: {
      tabSize: 4,
      insertSpaces: true,
      autoCloseBrackets: true,
    },
    html: {
      tabSize: 2,
      insertSpaces: true,
      autoCloseBrackets: true,
    },
  };

  return defaults[language] || defaults.javascript;
};
