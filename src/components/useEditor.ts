{"import { useState, useEffect } from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { syntaxHighlighting } from 'prosemirror-highlight';

interface Props {
  onChange: (state: EditorState) => void;
  value: string;
}

const useEditor = ({ onChange, value }: Props) => {
  const state = useState(() => EditorState.create({ doc: value, plugins: [syntaxHighlighting()] }));
  const view = useState(() => new EditorView({ state, dispatchTransaction: (transaction) => {
    onChange(transaction.state.doc.toString());
  }}));
  return { view, state };
};

export default useEditor;