{"import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const Room = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    WebSocket.connect(roomId);
    return () => WebSocket.disconnect();
  }, [roomId]);

  return (
    <div>
      <Editor roomId={roomId} users={users} cursorPositions={cursorPositions} />
      <UserList users={users} />
      <WebSocket roomId={roomId} users={users} cursorPositions={cursorPositions} />
    </div>
  );
};

export default Room;