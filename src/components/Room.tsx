{"import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

function Room() {
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('');

  useEffect(() => {
    WebSocket.connect();
    return () => WebSocket.disconnect();
  }, []);

  return (
    <div>
      <Editor code={code} onChange={setCode} />
      <UserList users={users} />
      <WebSocket users={users} code={code} />
    </div>
  );
}

export default Room;