{"import React, { useState, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorProps } from './types';
import { useWebSocket } from './useWebSocket';

const Editor = ({ roomId, userId, language }) => {
  const [editorState, setEditorState] = useState(EditorState.create());
  const [view, setView] = useState(null);
  const { send, receive } = useWebSocket(roomId);

  useEffect(() => {
    const view = new EditorView(editor, editorState);
    setView(view);
    return () => view.destroy();
  }, [editorState]);

  useEffect(() => {
    receive((delta) => {
      setEditorState((state) => EditorState.applyDelta(state, delta));
    });
  }, [receive]);

  const handleInput = (input) => {
    send({ type: 'input', input });
  };

  return (
    <div className='editor' onInput={handleInput}>
      <EditorView state={editorState} dispatch={null} />
    </div>
  );
};

export default Editor;