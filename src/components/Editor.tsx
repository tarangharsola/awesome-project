{"import React, { useState, useEffect } from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from './schema';
import { history } from './history';
import { useWebSocket } from './useWebSocket';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.create());
  const [view, setView] = useState(null);
  const { send } = useWebSocket();

  useEffect(() => {
    const view = new EditorView(editor, editorState, onSelectionChange);
    setView(view);
    return () => view.destroy();
  }, [editorState]);

  const onSelectionChange = () => {
    const selection = view.state.selection;
    send({ type: 'selection', payload: selection.from, to: selection.to });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      send({ type: 'insert', payload: '
' });
    }
  };

  return (
    <div className="editor" onKeyPress={handleKeyDown}>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default EditorComponent;