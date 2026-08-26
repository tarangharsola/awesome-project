import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

export const applyFormattingDefaults = (view: EditorView, language: string) => {
  const extensions = [];
  switch (language) {
    case 'javascript':
      extensions.push(javascript({ jsx: true }));
      break;
    case 'python':
      extensions.push(python());
      break;
    case 'html':
      extensions.push(html());
      break;
    default:
      break;
  }
  // Reconfigure the editor with the language-specific extensions and a sensible tab size.
  view.dispatch({
    effects: [
      EditorView.reconfigure.of(extensions),
      EditorView.tabSize.of(2),
    ],
  });
};
