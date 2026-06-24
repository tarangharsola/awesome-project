{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import { useUsers } from '../utils/useUsers';

interface Props {
  language: string;
  onChanges: (changes: { user: string; changes: string[] }) => void;
}

const Editor = ({ language, onChanges }) => {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const { sendChanges } = useWebSocket();
  const { users: connectedUsers } = useUsers();

  useEffect(() => {
    const handleChanges = (changes) => {
      onChanges(changes);
    };

    sendChanges(handleChanges);
    return () => {
      sendChanges(null);
    };
  }, [sendChanges]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    sendChanges({ user: 'self', changes: [newCode] });
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
      />
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Editor;