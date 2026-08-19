import { EditorView } from '@codemirror/view';
import { keymap } from '@codemirror/view';
import { format as prettierFormat } from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserPython from 'prettier/parser-python';
import { Language } from './useLanguage';

/**
 * Returns a CodeMirror keymap extension that adds useful shortcuts:
 *   • Cmd/Ctrl + S – format the current document using Prettier.
 *   • Cmd/Ctrl + Shift + L – placeholder for language toggle (handled by UI).
 */
export const useKeyboardShortcuts = (language: Language, view: EditorView | null) => {
  if (!view) return [];

  const formatCode = () => {
    const code = view.state.doc.toString();
    let parser: string = 'babel';
    if (language === 'python') parser = 'python';
    if (language === 'html') parser = 'html';
    try {
      const formatted = prettierFormat(code, {
        parser,
        plugins: [parserBabel, parserHTML, parserPython],
        singleQuote: true,
      });
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: formatted },
      });
    } catch (e) {
      console.error('Formatting failed:', e);
    }
  };

  return keymap.of([
    {
      key: 'Mod-s',
      run: () => {
        formatCode();
        return true;
      },
    },
    {
      key: 'Mod-Shift-l',
      run: () => {
        // Language change is performed via UI; we simply return true to consume the shortcut.
        return true;
      },
    },
  ]);
};