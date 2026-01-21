{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [editorView, setEditorView] = React.useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    setEditorView(new EditorView(editor, state));
  };

  return (
    <div className="editor">
      <Editor
        value={editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorComponent;