{"import React, { useState, useEffect } from 'react';
import EditorComponent from './EditorComponent';
import useWebSocket from './useWebSocket';
import useUsers from './useUsers';
import useCursor from './useCursor';
import useConflictResolver from './useConflictResolver';

const Editor = () => {
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [conflict, setConflict] = useState(null);

  const { send, receive } = useWebSocket();
  const { users: connectedUsers } = useUsers();
  const { cursor: remoteCursor } = useCursor();
  const { resolveConflict } = useConflictResolver();

  useEffect(() => {
    receive((message) => {
      if (message.type === 'cursor') {
        setCursor(message.data);
      } else if (message.type === 'text') {
        setText(message.data);
      } else if (message.type === 'users') {
        setUsers(message.data);
      }
    });
  }, []);

  const handleTextChange = (newText) => {
    setText(newText);
    send({ type: 'text', data: newText });
  };

  const handleCursorChange = (newCursor) => {
    setCursor(newCursor);
    send({ type: 'cursor', data: newCursor });
  };

  const handleUserJoin = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserLeave = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <EditorComponent
        text={text}
        setText={handleTextChange}
        cursor={cursor}
        setCursor={handleCursorChange}
        users={users}
        connectedUsers={connectedUsers}
        remoteCursor={remoteCursor}
        conflict={conflict}
        resolveConflict={resolveConflict}
      />
    </div>
  );
};

export default Editor;