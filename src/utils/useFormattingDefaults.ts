export type FormattingOptions = {
  indentSize: number;
  useTabs: boolean;
  maxLineLength: number;
};

/**
 * Returns sensible default formatting options for supported languages.
 * These defaults are applied when the user switches the editor language.
 */
export const getFormattingDefaults = (language: string): FormattingOptions => {
  switch (language) {
    case "javascript":
      return { indentSize: 2, useTabs: false, maxLineLength: 80 };
    case "python":
      return { indentSize: 4, useTabs: false, maxLineLength: 79 };
    case "html":
      return { indentSize: 2, useTabs: false, maxLineLength: 120 };
    default:
      return { indentSize: 2, useTabs: false, maxLineLength: 80 };
  }
};
