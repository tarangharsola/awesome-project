{"import { EditorView } from 'prosemirror-view';

interface getCursorPosition {
  (view: EditorView): { x: number; y: number; };
}

const getCursorPosition = (view: EditorView): { x: number; y: number; } => {
  const { from, to } = view.state.selection;
  const { width, height } = view.dom.getBoundingClientRect();
  const x = from + (to - from) * width / (view.state.doc.nodeSize);
  const y = height - (view.state.doc.nodeSize - from);
  return { x, y };
};

export default getCursorPosition;