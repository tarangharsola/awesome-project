{"import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const Room = () => {
  const [users, setUsers] = useState([]);
  const [document, setDocument] = useState('');
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    WebSocket.connect();
    WebSocket.onMessage((message) => {
      if (message.type === 'cursorPosition') {
        setCursorPositions((prevCursorPositions) => ({ ...prevCursorPositions, [message.userId]: message.position }));
      } else if (message.type === 'userList') {
        setUsers(message.users);
      } else if (message.type === 'document') {
        setDocument(message.document);
      }
    });
  }, []);

  return (
    <div>
      <Editor document={document} setDocument={setDocument} cursorPositions={cursorPositions} />
      <UserList users={users} />
      <WebSocket />
    </div>
  );
};

export default Room;