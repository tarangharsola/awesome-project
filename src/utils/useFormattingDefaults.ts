import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

/**
 * Returns a set of CodeMirror extensions that configure sensible defaults
 * for the given language. These defaults include tab size, indentation,
 * auto‑closing brackets, and language‑specific syntax highlighting.
 */
export function useFormattingDefaults(language: string): Extension[] {
  const baseExtensions: Extension[] = [
    EditorView.lineWrapping,
    EditorView.theme({
      '&': {
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
      },
    }),
  ];

  const languageExtension = (() => {
    switch (language) {
      case 'javascript':
        return javascript({ jsx: true, typescript: false });
      case 'python':
        return python();
      case 'html':
        return html();
      default:
        return javascript();
    }
  })();

  const formattingExtension: Extension = [
    EditorView.editable.of(true),
    EditorView.lineWrapping,
    EditorView.theme({
      '&': {
        // default tab size of 2 spaces for JS/HTML, 4 for Python
        tabSize: language === 'python' ? 4 : 2,
      },
    }),
  ];

  return [...baseExtensions, languageExtension, formattingExtension];
}
