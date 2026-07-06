{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'editorContent') {
        setEditorContent(data.content);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Editor content={editorContent} />
      <UserList users={users} />
    </div>
  );
}

export default App;