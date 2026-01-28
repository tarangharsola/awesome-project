{"import React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const ConflictResolver = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  React.useEffect(() => {
    const handleChanges = (delta) => {
      setEditorState((prev) => EditorState.applyDelta(prev, delta));
    };

    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => handleChanges(JSON.parse(event.data));
    return () => socket.close();
  }, []);

  return <EditorView editorState={editorState} />;
};

export default ConflictResolver;