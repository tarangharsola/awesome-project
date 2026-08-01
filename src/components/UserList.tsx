{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  users: { id: string; name: string; color: string; }[];
}

const UserList = ({ users }: Props) => {
  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;