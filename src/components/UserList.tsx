{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: any;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { usersList } = useUsers(users);
  return <ul>{usersList.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}

export default UserList;