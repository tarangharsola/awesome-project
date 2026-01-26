{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: useUsers;
}

const UserList = ({ users }: UserListProps) => {
  const { usersList } = users;
  return <div>{usersList.map((user, index) => <div key={index}>{user.name} {user.color}</div>)}</div);
};

export default UserList;