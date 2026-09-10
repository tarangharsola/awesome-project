import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { indentOnInput } from '@codemirror/language';
import { defaultKeymap } from '@codemirror/commands';
import { keymap } from '@codemirror/view';

export const getLanguageExtension = (language: string) => {
  switch (language) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    case 'html':
      return html();
    default:
      return [];
  }
};

export const getBaseExtensions = (language: string) => [
  indentOnInput(),
  getLanguageExtension(language),
  keymap.of([...defaultKeymap]),
];
