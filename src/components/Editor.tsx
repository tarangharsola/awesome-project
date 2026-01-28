{"import React from 'react';
import { EditorState, Editor } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { \"/src/components/ConflictResolver.tsx\" \} from '\/src/components';

const EditorComponent = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [view, setView] = React.useState(null);

  React.useEffect(() => {
    const handleChanges = (delta) => {
      setEditorState((prev) => EditorState.applyDelta(prev, delta));
    };
    const handleCursorChange = (cursor) => {
      setView((prev) => EditorView.update(prev, { cursor }));
    };

    const handleUserListChange = (users) => {
      setUsers(users);
    };

    const handleWebSocketMessage = (message) => {
      if (message.type === 'UPDATE') {
        handleChanges(message.delta);
      } else if (message.type === 'CURSOR') {
        handleCursorChange(message.cursor);
      } else if (message.type === 'USER_LIST') {
        handleUserListChange(message.users);
      }
    };

    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => handleWebSocketMessage(JSON.parse(event.data));
    return () => socket.close();
  }, []);

  return (
    <div>
      <EditorView editorState={editorState} view={view} />
      <ConflictResolver editorState={editorState} />
      <UserList users={users} />
    </div>
  );
};

export default EditorComponent;