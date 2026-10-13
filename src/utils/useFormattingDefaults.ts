/**
 * Simple per‑language formatting defaults used by the editor.
 * Currently controls indentation width and line‑wrapping.
 */
export interface FormattingOptions {
  indentUnit: number;
  lineWrapping: boolean;
}

export const formattingDefaults: Record<string, FormattingOptions> = {
  javascript: { indentUnit: 2, lineWrapping: true },
  python: { indentUnit: 4, lineWrapping: true },
  html: { indentUnit: 2, lineWrapping: true },
};

/**
 * Hook‑like helper that returns formatting options for a given language.
 * Falls back to JavaScript defaults when the language is unknown.
 */
export const useFormattingDefaults = (language: string): FormattingOptions => {
  return formattingDefaults[language] ?? formattingDefaults.javascript;
};
