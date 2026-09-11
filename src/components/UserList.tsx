import React from 'react';
import { useAwareness } from '../hooks/useAwareness';
import type { User } from '../hooks/useAwareness';

interface Props {
  url: string;
  sessionId: string;
  localUser: User;
}

export const UserList: React.FC<Props> = ({ url, sessionId, localUser }) => {
  const { users } = useAwareness(url, sessionId, localUser);

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.userId} className="user-item" style={{ color: user.color }}>
          {user.username}
        </div>
      ))}
    </div>
  );
};