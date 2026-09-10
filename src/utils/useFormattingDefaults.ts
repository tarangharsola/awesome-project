import { EditorState } from '@codemirror/state';

/**
 * Provides sensible default formatting settings for the editor.
 * Currently sets tab size and indent unit to 2 spaces.
 */
export const useFormattingDefaults = () => ({
  tabSize: 2,
  indentUnit: 2,
  insertSpaces: true,
});
