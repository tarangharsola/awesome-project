{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState(null);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parse(document.body.innerHTML);
    const state = EditorState.createWithJSON(doc);
    setEditorState(state);
  }, []);

  const updateEditorState = (newState) => {
    setEditorState(newState);
  };

  const handleEditorChange = (newState) => {
    updateEditorState(newState);
  };

  React.useEffect(() => {
    const view = new EditorView(document.getElementById('editor'), {
      state: editorState,
      dispatchTransaction: (transaction) => {
        updateEditorState(transaction.apply(editorState));
      },
    });
    setView(view);
    return () => {
      view.destroy();
    };
  }, [editorState]);

  return (
    <div id="editor" style={{ height: '500px' }}>
      <Editor
        state={editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorComponent;