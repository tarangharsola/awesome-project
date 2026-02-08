{"import React from 'react';
import { useUsers } from './useUsers';
import { UserList } from './UserList';

const UserListComponent: React.FC = () => {
  const users = useUsers();
  return <UserList users={users} />;
}

export default UserListComponent;