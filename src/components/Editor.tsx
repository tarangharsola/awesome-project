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
    const state = EditorState.create({ doc });
    setEditorState(state);
    setView(new EditorView(document.body, { state }));
  }, []);

  const handleUpdate = (state) => {
    setEditorState(state);
    view.update(state);
  };

  return (
    <div className="editor">
      <Editor
        value={editorState}
        onChange={handleUpdate}
      />
    </div>
  );
};

export default EditorComponent;