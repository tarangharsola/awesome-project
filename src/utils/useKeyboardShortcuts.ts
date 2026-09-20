import { EditorView } from '@codemirror/view';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';

/**
 * Registers common keyboard shortcuts for the editor instance.
 * - Ctrl/Cmd + S : Save (currently logs to console)
 * - Ctrl/Cmd + Shift + F : Format (logs to console)
 * - Tab : Indent (default behavior)
 */
export const useKeyboardShortcuts = (view: EditorView) => {
  const shortcuts = [
    {
      key: 'Mod-s',
      run: () => {
        console.log('Save shortcut triggered');
        // Placeholder for actual save logic (e.g., emit a save event)
        return true;
      },
    },
    {
      key: 'Mod-Shift-f',
      run: () => {
        console.log('Format shortcut triggered');
        // Placeholder for formatting logic (e.g., prettier integration)
        return true;
      },
    },
    // Preserve default tab indentation
    indentWithTab,
  ];

  const extension = keymap.of(shortcuts);
  view.dispatch({ effects: EditorView.appendConfig.of(extension) });
};
