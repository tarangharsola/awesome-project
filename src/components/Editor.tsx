{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';

interface Props {
  roomId: string;
  language: string;
}

const Editor = ({ roomId, language }) => {
  const [code, setCode] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);

  const { send, receive } = useWebSocket(roomId);
  const { users: connectedUsers } = useUsers(roomId);

  useEffect(() => {
    setUsers(connectedUsers);
  }, [connectedUsers]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    send({ type: 'code', data: newCode });
  }

  const handleCursorChange = (newCursor) => {
    setCursor(newCursor);
    send({ type: 'cursor', data: newCursor });
  }

  return (
    <div>
      <h1>Editor</h1>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
      />
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <CursorTracker cursor={cursor} user={users.find((u) => u.id === cursor.userId)} />
    </div>
  );
}

export default Editor;