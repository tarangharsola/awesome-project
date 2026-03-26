{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';

interface RoomProps {
  document: string;
}

const Room: React.FC<RoomProps> = ({ document }) => {
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();
  const { users: usersFromStore } = useUsers();

  useEffect(() => {
    const handleReceive = (message: any) => {
      if (message.type === 'join') {
        setUsers((prevUsers) => [...prevUsers, message.data]);
      } else if (message.type === 'leave') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== message.data.id));
      }
    };
    receive(handleReceive);
    return () => receive(handleReceive);
  }, [receive, setUsers]);

  const handleJoin = () => {
    const userId = Math.random().toString(36).substr(2, 9);
    send({ type: 'join', data: { id: userId, name: 'User ' + userId } });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      padding: 10
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1
      }}>
        {users.map((user, index) => (
          <CursorTracker
            key={index}
            cursor={user.cursor}
            user={user.name}
            color={user.color}
          />
        ))}
      </div>
      <Editor
        language='javascript'
        document={document}
      />
    </div>
  );
}

export default Room;