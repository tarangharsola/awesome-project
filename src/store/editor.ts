{"import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorProps } from './types';

const defaultEditorState = EditorState.create({
  doc: '',
  selection: EditorState.selection.empty,
});

const defaultEditorView = EditorView.create({
  state: defaultEditorState,
  dispatchTransaction: () => {}
});

export { defaultEditorState, defaultEditorView };