{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'editor') {
        setEditor(data.editor);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <Editor editor={editor} />
      <UserList users={users} />
    </div>
  );
}

export default App;