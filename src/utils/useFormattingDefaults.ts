/**
 * Default formatting options per language.
 * These options are used when initializing the editor extensions.
 */
export const formattingDefaults: Record<string, { tabSize: number; insertSpaces: boolean }> = {
  javascript: { tabSize: 2, insertSpaces: true },
  python: { tabSize: 4, insertSpaces: true },
  html: { tabSize: 2, insertSpaces: true },
};

/**
 * Retrieves formatting options for a given language.
 * Falls back to JavaScript defaults if the language is unknown.
 */
export function getFormattingOptions(language: string) {
  return formattingDefaults[language] ?? formattingDefaults.javascript;
}
