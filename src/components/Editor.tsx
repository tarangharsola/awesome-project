{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';

function Editor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setEditorState(data.editorState);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <EditorState editorState={editorState} />
      <UserList users={users} />
    </div>
  );
}

export default Editor;