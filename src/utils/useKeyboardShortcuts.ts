import { useEffect } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { formatCode } from './formatCode';

type ShortcutOptions = {
  onSave?: () => void;
  language: string;
};

/**
 * Registers common keyboard shortcuts for the editor instance.
 * - Mod-s: triggers the optional onSave callback.
 * - Mod-Shift-f: formats the current document using the language‑specific formatter.
 */
export function useKeyboardShortcuts(view: EditorView | null, options: ShortcutOptions) {
  useEffect(() => {
    if (!view) return undefined;

    const saveCommand = () => {
      options.onSave?.();
      return true;
    };

    const formatCommand = () => {
      const doc = view.state.doc.toString();
      const formatted = formatCode(doc, options.language);
      if (formatted !== doc) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: formatted },
        });
      }
      return true;
    };

    const shortcuts = keymap.of([
      { key: 'Mod-s', run: saveCommand },
      { key: 'Mod-Shift-f', run: formatCommand },
    ]);

    const transaction = view.state.update({ effects: EditorView.appendConfig.of([shortcuts]) });
    view.update([transaction]);

    return () => {
      // Remove the shortcuts when the component unmounts or view changes.
      const removal = view.state.update({ effects: EditorView.reconfigure.of([]) });
      view.update([removal]);
    };
  }, [view, options.onSave, options.language]);
}
