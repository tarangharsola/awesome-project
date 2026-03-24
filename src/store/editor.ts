{"import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';

const editorState = EditorState.create({
  doc: '',
  plugins: [
    keymap({
      'Mod-z': () => editorState.undo(),
      'Mod-Shift-z': () => editorState.redo(),
    }),
    history(),
  ],
});

const editorView = new EditorView(document.getElementById('editor'), {
  state: editorState,
  dispatchTransaction: (transaction) => {
    editorState = editorState.apply(transaction);
  },
});

export default editorView;