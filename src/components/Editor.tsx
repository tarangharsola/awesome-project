{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { syntaxHighlighting } from 'prosemirror-highlight';

interface Props {
  onChange: (state: EditorState) => void;
  value: string;
}

const EditorComponent = ({ onChange, value }: Props) => {
  const state = EditorState.create({ doc: value, plugins: [syntaxHighlighting()] });
  const view = new EditorView({ state, dispatchTransaction: (transaction) => {
    onChange(transaction.state.doc.toString());
  }});
  return <div className="editor" ref={view.contentDOM} />
};

export default EditorComponent;