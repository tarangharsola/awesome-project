{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState(null);

  React.useEffect(() => {
    const view = new EditorView(document.getElementById('editor'), editorState, plugins);
    setView(view);
    return () => view.destroy();
  }, [editorState, plugins]);

  const handleUpdate = (state) => setEditorState(state);

  return (
    <div id='editor' style={{ height: '100vh' }}>
      <Editor
        state={editorState}
        onChange={handleUpdate}
        plugins={plugins}
      />
    </div>
  );
};

export default EditorComponent;