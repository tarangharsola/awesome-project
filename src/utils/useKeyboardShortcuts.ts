import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { format } from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserPython from 'prettier/parser-python';
import { EditorView } from '@codemirror/view';

type Language = 'javascript' | 'python' | 'html';

export const useKeyboardShortcuts = (language: Language) => {
  const formatDoc = (view: EditorView) => {
    const code = view.state.doc.toString();
    let parser: any = 'babel';
    if (language === 'python') parser = 'python';
    else if (language === 'html') parser = 'html';
    try {
      const formatted = format(code, {
        parser,
        plugins: [parserBabel, parserHTML, parserPython],
      });
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: formatted },
      });
    } catch (e) {
      console.error('Formatting error:', e);
    }
    return true;
  };

  return keymap.of([
    { key: 'Mod-s', run: formatDoc },
    { key: 'Tab', run: indentWithTab },
  ]);
};
