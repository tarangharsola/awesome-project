{"import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const Room = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const [document, setDocument] = useState('');

  useEffect(() => {
    WebSocket.connect(roomId);
    WebSocket.on('users', (users) => setUsers(users));
    WebSocket.on('cursorPositions', (cursorPositions) => setCursorPositions(cursorPositions));
    WebSocket.on('document', (document) => setDocument(document));
  }, [roomId]);

  return (
    <div>
      <Editor document={document} onDocumentChange={(document) => WebSocket.send('document', document)} />
      <UserList users={users} cursorPositions={cursorPositions} />
    </div>
  );
};

export default Room;