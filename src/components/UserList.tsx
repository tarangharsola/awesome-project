import React from 'react';
import { useUsers } from '../hooks/useUsers';

interface Props {
  roomId: string;
  username: string;
}

export const UserList: React.FC<Props> = ({ roomId, username }) => {
  const { users, connected } = useUsers(roomId, username);
  return (
    <div className="user-list">
      <h3>{connected ? 'Online' : 'Offline'}</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ color: u.color }}>
            {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
