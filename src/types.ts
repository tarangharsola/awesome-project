{"import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { User } from './user';

interface Cursor {
  x: number;
  y: number;
}

interface User {
  username: string;
  color: string;
}

interface EditorStateProps {
  value: string;
}

interface EditorState {
  doc: string;
  plugins: EditorView[];
}

interface EditorView {
  state: EditorState;
  dispatchTransaction: (transaction: any) => EditorState;
}
}