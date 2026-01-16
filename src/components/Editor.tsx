{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState(null);

  React.useEffect(() => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString('<p>Hello World!</p>', 'text/html');
    const state = EditorState.create({ doc });
    setEditorState(state);
  }, []);

  const handleUpdate = (state) => {
    setEditorState(state);
  };

  return (
    <div>
      <Editor
        value={editorState}
        onChange={handleUpdate}
      />
    </div>
  );
};

export default EditorComponent;