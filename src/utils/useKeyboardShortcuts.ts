import { keymap } from '@codemirror/view';
import { formatCode } from './formatCode';
import { EditorView } from '@codemirror/basic-setup';

export const useKeyboardShortcuts = (view: EditorView, language: string) => {
  const format = () => {
    const doc = view.state.doc.toString();
    const formatted = formatCode(doc, language);
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: formatted },
    });
  };

  const save = () => {
    const blob = new Blob([view.state.doc.toString()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'html'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return keymap.of([
    {
      key: 'Mod-s',
      run: () => {
        save();
        return true;
      },
    },
    {
      key: 'Mod-Shift-f',
      run: () => {
        format();
        return true;
      },
    },
    {
      key: 'Tab',
      run: (view) => {
        view.dispatch(view.state.replaceSelection('  '));
        return true;
      },
    },
  ]);
};