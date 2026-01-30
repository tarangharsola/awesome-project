{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Extension } from 'prosemirror-extensions';

interface Props {
  onChange: (state: EditorState) => void;
  value: string;
}

const EditorComponent = ({ onChange, value }: Props) => {
  const state = EditorState.create({ doc: value });
  const view = new EditorView(state, new Extension());
  const onChangeHandler = (state: EditorState) => {
    onChange(state.toString());
  };
  view.dispatch({ type: 'change', state: onChangeHandler });
  return <Editor view={view} />;
};

export default EditorComponent;