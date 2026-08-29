import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';

export const useFormattingDefaults = (): Extension[] => [
  EditorView.lineWrapping,
  EditorView.theme(
    {
      '&': {
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
      },
      '.cm-content': {
        fontFamily: 'monospace',
      },
    },
    { dark: true }
  ),
];
