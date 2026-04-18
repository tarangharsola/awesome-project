{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import Editor from './Editor';
import UserList from './UserList';

const Room = () => {
  const [users, setUsers] = useState([]);
  const [editorValue, setEditorValue] = useState('');
  const { connect, disconnect, send } = useWebSocket();

  useEffect(() => {
    connect('ws://localhost:8080');
    return () => disconnect();
  }, []);

  const handleSendMessage = (message) => {
    send(message);
  };

  return (
    <div>
      <Editor value={editorValue} onChange={setEditorValue} />
      <UserList users={users} />
    </div>
  );
};

export default Room;