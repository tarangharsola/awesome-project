{"import React from 'react';
import { EditorState, EditorProps } from 'prosemirror-state';
import { EditorView, EditorProps as ProsemirrorEditorProps } from 'prosemirror-view';
import { Extension } from 'prosemirror-extensions';

interface EditorProps extends ProsemirrorEditorProps {
  // Add custom props here
}

const Editor = ({ children, ...props }: EditorProps) => {
  const [editorState, setEditorState] = React.useState(EditorState.create());
  const [view, setView] = React.useState<EditorView>();

  React.useEffect(() => {
    const updateEditorState = () => {
      setEditorState(EditorState.create());
    };

    const updateView = () => {
      setView(new EditorView(document.getElementById('editor'), editorState, extension));
    };

    updateEditorState();
    updateView();
  }, []);

  return (
    <div id="editor" style={{ height: '100vh' }}>
      {view && view.render()}
    </div>
  );
};

export default Editor;