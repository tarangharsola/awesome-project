{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Extension } from 'prosemirror-extensions';

interface Props {
  onChange: (state: EditorState) => void;
  value: string;
}

const EditorComponent: React.FC<Props> = ({ onChange, value }) => {
  const [editorState, setEditorState] = React.useState(EditorState.create(value));
  const [editorView, setEditorView] = React.useState(null);

  React.useEffect(() => {
    const view = new EditorView(editorState, new Extension());
    setEditorView(view);
    return () => {
      view.destroy();
    };
  }, [editorState]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    onChange(state);
  };

  return (
    <div className="editor">
      <EditorView editorState={editorState} onSelectionChange={handleEditorChange} />
    </div>
  );
}

export default EditorComponent;