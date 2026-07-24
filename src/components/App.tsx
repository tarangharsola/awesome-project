{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      } else if (data.type === 'updateEditorContent') {
        setEditorContent(data.content);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleUserJoin = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
    ws.send(JSON.stringify({ type: 'updateEditorContent', content }));
  };

  return (
    <div>
      <Editor language={language} content={editorContent} onChange={handleEditorChange} />
      <UserList users={users} onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
      <WebSocket ws={ws} />
    </div>
  );
};

export default App;