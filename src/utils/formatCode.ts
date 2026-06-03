{"import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const formatCode = (editorState: EditorState) => {
  const view = new EditorView({ state: editorState });
  const formattedCode = view.state.doc.toString();
  return formattedCode;
};

export default formatCode;