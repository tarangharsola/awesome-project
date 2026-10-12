import { Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';

/**
 * Hook that returns a CodeMirror extension handling common keyboard shortcuts.
 * @param formatCallback Function to invoke when the format shortcut is pressed.
 */
export const useKeyboardShortcuts = (formatCallback: () => void): Extension => {
  const bindings = [
    {
      key: 'Mod-Shift-f',
      run: () => {
        formatCallback();
        return true;
      },
    },
    {
      key: 'Mod-s',
      run: () => {
        // Placeholder for a save action; can be wired to actual persistence later.
        console.log('Document saved (placeholder)');
        return true;
      },
    },
  ];
  return keymap.of(bindings);
};