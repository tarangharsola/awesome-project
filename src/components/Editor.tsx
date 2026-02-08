{"import React from 'react';
import { EditorState, EditorProps } from 'prosemirror-state';
import { EditorView, EditorProps as ProsemirrorEditorProps } from 'prosemirror-view';
import { Editor } from './Editor';

interface Props extends ProsemirrorEditorProps {
  onChange: (state: EditorState) => void;
}

const EditorComponent: React.FC<Props> = ({ onChange, ...props }) => {
  const [state, setState] = React.useState(EditorState.create());
  const view = new EditorView(state, props);
  const handleStateChange = (state: EditorState) => {
    setState(state);
    onChange(state);
  };
  React.useEffect(() => {
    const subscription = view.dispatchStateChange(() => handleStateChange);
    return () => subscription.unsubscribe();
  }, []);
  return <Editor view={view} />;
}

export default EditorComponent;