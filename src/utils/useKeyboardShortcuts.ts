import { keymap } from '@codemirror/view';
import type { Extension } from '@codemirror/state';

/**
 * Generates a CodeMirror keymap extension.
 * Accepts an optional callbacks object for custom actions.
 */
export function useKeyboardShortcuts(callbacks?: { formatDocument?: () => void }): Extension {
  const baseShortcuts = [
    // Save shortcut (Ctrl/Cmd + S)
    {
      key: 'Mod-s',
      run: () => {
        // Placeholder: actual save logic is handled elsewhere.
        console.log('Save shortcut triggered');
        return true;
      },
    },
    // Undo / Redo are already provided by default extensions.
  ];

  if (callbacks?.formatDocument) {
    baseShortcuts.push({
      key: 'Mod-Shift-f',
      run: () => {
        callbacks.formatDocument!();
        return true;
      },
    });
  }

  return keymap.of(baseShortcuts);
}
