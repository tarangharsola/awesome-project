import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { [key: string]: { name: string; color: string } };
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {Object.keys(users).map((userId) => (
        <div key={userId}>
          <span style={{ color: users[userId].color }}>
            {users[userId].name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;