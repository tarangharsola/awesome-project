{"import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const Room = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    WebSocket.connect();
    WebSocket.on('users', (users) => setUsers(users));
    WebSocket.on('cursorPositions', (cursorPositions) => setCursorPositions(cursorPositions));
  }, []);

  return (
    <div>
      <Editor cursorPositions={cursorPositions} />
      <UserList users={users} />
    </div>
  );
};

export default Room;