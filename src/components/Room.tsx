import React from 'react';
import { useUsers } from './useUsers';

interface Props {
  roomId: string;
}

const Room: React.FC<Props> = ({ roomId }) => {
  const { users } = useUsers(roomId);
  return (
    <div>
      <h1>Room {roomId}</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Room;