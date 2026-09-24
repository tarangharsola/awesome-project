/**
 * Provides default formatting options for the code editor.
 * These defaults are applied when the editor is instantiated and can be
 * overridden by user preferences in the future.
 */
export const useFormattingDefaults = () => {
  return {
    tabSize: 2,
    insertSpaces: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    // Additional defaults can be added here
  };
};