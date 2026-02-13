{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState(null);

  const handleUpdate = (state) => {
    setEditorState(state);
  };

  React.useEffect(() => {
    const view = new EditorView(document.querySelector('#editor'), {
      state: editorState,
      dispatchTransaction: handleUpdate,
    });
    setView(view);
    return () => view.destroy();
  }, [editorState]);

  return (
    <div id="editor" style={{ height: 500 }}>
      <Editor state={editorState} />
    </div>
  );
};

export default EditorComponent;