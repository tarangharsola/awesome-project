import { useEffect } from 'react';
import { EditorView, keymap } from '@codemirror/view';

type ShortcutCallback = () => void;

interface Props {
  viewRef: React.MutableRefObject<EditorView | null>;
  onSave?: ShortcutCallback;
  onFormat?: ShortcutCallback;
}

export const useKeyboardShortcuts = ({ viewRef, onSave, onFormat }: Props) => {
  useEffect(() => {
    if (!viewRef.current) return;

    const saveCommand = () => {
      onSave?.();
      return true; // Prevent default
    };

    const formatCommand = () => {
      onFormat?.();
      return true;
    };

    const shortcuts = keymap.of([
      { key: 'Mod-s', run: saveCommand },
      { key: 'Mod-Shift-f', run: formatCommand },
    ]);

    // Apply shortcuts to the editor view
    viewRef.current.dispatch({ effects: shortcuts.reconfigure() });
  }, [viewRef, onSave, onFormat]);
};