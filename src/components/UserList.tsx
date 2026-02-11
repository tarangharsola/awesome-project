import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: any;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;