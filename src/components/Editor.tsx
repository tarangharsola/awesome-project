{"import React from 'react';
import { EditorState, EditorProps } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Editor } from './Editor';

interface Props extends EditorProps {
  onChange: (state: EditorState) => void;
}

const EditorComponent: React.FC<Props> = ({ onChange, ...props }) => {
  const [state, setState] = React.useState(EditorState.createEmpty());
  const view = new EditorView(state, new Editor(props));

  React.useEffect(() => {
    const handleStateChange = () => {
      onChange(state); // eslint-disable-line no-unused-vars
    };
    view.dispatch({ type: 'selection', selection: state.selection });
    view.dispatch({ type: 'update', state: state });
    return () => {
      view.destroy();
    };
  }, [state, onChange]);

  return (
    <div className='editor-container'>
      <EditorView state={state} view={view} />
    </div>
  );
}

export default EditorComponent;