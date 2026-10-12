import { Extension } from '@codemirror/state';
import { lineNumbers, highlightActiveLine } from '@codemirror/view';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { indentOnInput } from '@codemirror/language';

export const baseExtensions: Extension[] = [
  lineNumbers(),
  highlightActiveLine(),
  bracketMatching(),
  closeBrackets(),
  indentOnInput(),
  history(),
];

export const languageExtension = (lang: string): Extension => {
  switch (lang) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    case 'html':
      return html();
    default:
      return javascript();
  }
};

export const keymapExtensions: Extension[] = [
  defaultKeymap,
  historyKeymap,
  closeBracketsKeymap,
];