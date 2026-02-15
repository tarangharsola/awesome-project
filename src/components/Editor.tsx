{"import React from 'react';
import { EditorState, EditorProps } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Editor } from 'react-prosemirror';

interface Props extends EditorProps {
  onChange: (state: EditorState) => void;
}

const EditorComponent: React.FC<Props> = ({ onChange, ...props }) => {
  const [state, setState] = React.useState(EditorState.createEmpty());
  const view = new EditorView(state, new EditorState(state));

  const handleChange = (state: EditorState) => {
    onChange(state);
    setState(state);
  };

  return (
    <Editor
      value={state}
      onChange={handleChange}
      {...props}
    />
  );
};

export default EditorComponent;