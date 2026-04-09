{"import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { updateValue } from './actions';

interface EditorStateProps {
  value: string;
}

const editorState = (value: string): EditorState => {
  return EditorState.create({
    doc: value,
    plugins: [
      new EditorView({
        state: editorState(value),
        dispatchTransaction: (transaction) => {
          const newState = editorState(transaction.getChanges().map((change) => change.doc).join(''));
          return newState;
        }
      })
    ]
  });
};

export default editorState;