{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Extension } from 'prosemirror-extensions';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  React.useEffect(() => {
    const view = new EditorView(document.getElementById('editor'), {
      state: editorState,
      dispatchTransaction: (transaction) => {
        handleEditorChange(transaction.apply(editorState));
      },
    });
    setView(view);
    return () => {
      view.destroy();
    };
  }, [editorState]);

  return (
    <div id="editor" style={{ height: 500 }}>
      <Editor state={editorState} extensions={[]} />
    </div>
  );
};

export default EditorComponent;