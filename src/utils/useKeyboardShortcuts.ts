import { keymap } from '@codemirror/view';
import { formatCode } from './formatCode';
import { commentLine } from '@codemirror/comment';

// Hook that returns a CodeMirror keymap extension handling common shortcuts.
export const useKeyboardShortcuts = (sendChange: (doc: string) => void) => {
  const format = () => {
    // Assuming the editor instance will call this via the keymap context.
    // The keymap receives the view, we can format the whole document.
    return (view: any) => {
      const formatted = formatCode(view.state.doc.toString());
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: formatted } });
      sendChange(formatted);
      return true;
    };
  };

  const toggleComment = () => {
    return (view: any) => {
      commentLine(view);
      return true;
    };
  };

  return keymap.of([
    { key: 'Mod-Shift-f', run: format() }, // Format document (Ctrl+Shift+F / Cmd+Shift+F)
    { key: 'Mod-/', run: toggleComment() }, // Toggle line comment (Ctrl+/)
  ]);
};
