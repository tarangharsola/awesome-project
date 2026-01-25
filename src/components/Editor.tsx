{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState(null);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parse(document.getElementById('editor').innerHTML);
    const state = EditorState.createWithJSON(doc);
    setEditorState(state);
  }, []);

  const updateEditorState = (state) => {
    setEditorState(state);
  };

  const handleEditorChange = (state) => {
    updateEditorState(state);
  };

  return (
    <div id="editor">
      <Editor
        state={editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorComponent;