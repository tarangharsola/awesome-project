import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: useUsers;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { usersList } = users;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {usersList.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;