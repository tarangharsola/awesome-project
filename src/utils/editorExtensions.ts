import { Extension } from '@codemirror/state';
import { lineNumbers, highlightActiveLine, EditorView } from '@codemirror/view';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { indentOnInput } from '@codemirror/language';

export const defaultEditorExtensions: Extension[] = [
  lineNumbers(),
  highlightActiveLine(),
  defaultHighlightStyle,
  bracketMatching(),
  closeBrackets(),
  closeBracketsKeymap,
  indentOnInput(),
  // Enable line wrapping for better readability
  EditorView.lineWrapping,
];