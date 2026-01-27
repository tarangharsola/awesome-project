{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  roomId: string;
}

const UserList: React.FC<UserListProps> = ({ roomId }) => {
  const users = useUsers(roomId);
  return <div>Users: {JSON.stringify(users)}</div>
};

export default UserList;