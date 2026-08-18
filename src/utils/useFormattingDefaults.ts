// src/utils/useFormattingDefaults.ts
/**
 * Returns sensible default editor formatting options based on the selected language.
 * These defaults are applied when the editor instance is created or when the language changes.
 */
export function getFormattingDefaults(language: string) {
  // Basic defaults common to all languages
  const base = {
    tabSize: 2,
    insertSpaces: true,
    autoClosingBrackets: true,
    matchBrackets: true,
  };

  // Language‑specific tweaks
  switch (language.toLowerCase()) {
    case 'javascript':
    case 'js':
    case 'typescript':
    case 'ts':
      return {
        ...base,
        tabSize: 2,
        // Prefer semicolons and trailing commas – editors that support it can use these flags
        // (the actual formatter is handled elsewhere)
      };
    case 'python':
      return {
        ...base,
        tabSize: 4,
        insertSpaces: true,
      };
    case 'html':
    case 'xml':
      return {
        ...base,
        tabSize: 2,
        // HTML often benefits from auto‑closing tags
        autoCloseTags: true,
      };
    default:
      return base;
  }
}
