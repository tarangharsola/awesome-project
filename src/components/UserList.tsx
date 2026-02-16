{"import React, { useState, useEffect } from 'react';
import { UserList } from './UserList';

interface Props {
  users: { id: string; name: string; color: string }[];
}

const UserListComponent: React.FC<Props> = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState(users);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div className="user-list">
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserListComponent;