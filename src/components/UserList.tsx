{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: any;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  // ... implementation ...
}

export default UserList;