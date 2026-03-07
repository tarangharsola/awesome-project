{"import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { history } from 'history';

const Editor = () => {
  const { roomId } = useParams();
  const [editorState, setEditorState] = useState(EditorState.create());
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    WebSocket.connect(roomId);
    return () => WebSocket.disconnect();
  }, [roomId]);

  const onTextChange = (newEditorState) => {
    setEditorState(newEditorState);
    WebSocket.sendText(roomId, newEditorState.toString());
  };

  return (
    <div>
      <EditorView
        state={editorState}
        dispatchTransaction={onTextChange}
        plugins={[
          history
        ]}
      />
    </div>
  );
};

export default Editor;